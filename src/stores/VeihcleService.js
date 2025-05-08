import { db, storage } from "./FirebaseStore";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  listAll,
  deleteObject
} from "firebase/storage";
 import axios from "axios";

const API_BASE_URL = 'https://brasilapi.com.br/api';

// Cache para armazenar as marcas e modelos
const cache = {
  carBrands: null,
  carModels: {}
};

export const fetchCarBrands = async () => {
  try {
    // Se já temos as marcas em cache, retornamos
    if (cache.carBrands) {
      return cache.carBrands;
    }

    const response = await axios.get(`${API_BASE_URL}/fipe/marcas/v1/carros`);
    
    // Mapeia mantendo toda a estrutura da marca e adiciona o nome normalizado para ordenação
    const brands = response.data.map(brand => ({
      codigo: brand.valor,
      nome: brand.nome,
      // Armazena o nome em minúsculas sem acentos para ordenação consistente
      nomeNormalizado: brand.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }));
    
    // Ordena as marcas pelo nome (usando a versão normalizada)
    brands.sort((a, b) => {
      if (a.nomeNormalizado < b.nomeNormalizado) return -1;
      if (a.nomeNormalizado > b.nomeNormalizado) return 1;
      return 0;
    });
    
    // Remove o campo temporário de normalização que usamos apenas para ordenação
    const sortedBrands = brands.map(({ nomeNormalizado, ...rest }) => rest);
    
    // Armazena no cache
    cache.carBrands = sortedBrands;
    
    return sortedBrands;
  } catch (error) {
    console.error('Error fetching car brands:', error);
    throw error;
  }
};

export const fetchCarModels = async (brand) => {
  try {
    // Se já temos os modelos desta marca em cache, retornamos
    if (cache.carModels[brand.nome]) {
      return cache.carModels[brand.nome];
    }
    
    if (!brand || !brand.codigo) {
      return
    }

    // Agora buscamos os modelos
    const modelsResponse = await axios.get(`${API_BASE_URL}/fipe/veiculos/v1/carros/${brand.codigo}`);
    const models = modelsResponse.data.map(model => model.modelo);
    
    // Remove duplicatas e ordena
    const uniqueModels = [...new Set(models)].sort();
    
    // Armazena no cache
    cache.carModels[brand.nome] = uniqueModels;
    
    return uniqueModels;
  } catch (error) {
    console.error(`Error fetching models for brand ${brand.nome}:`, error);
    throw error;
  }
};

// Adicionar um novo veículo para o usuário
export const addVehicle = async (userId, vehicleData) => {
  try {
    const vehicleRef = collection(db, "vehicles");
    const newVehicle = {
      ...vehicleData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    const docRef = await addDoc(vehicleRef, newVehicle);
    return { id: docRef.id, ...newVehicle };
  } catch (error) {
    console.error("Error adding vehicle: ", error);
    throw error;
  }
};

// Obter todos os veículos
export const getAllVehicles = async () => {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const querySnapshot = await getDocs(vehiclesRef);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting all vehicles: ", error);
    throw error;
  }
};

// Obter todos os veículos de um usuário
export const getVehiclesByUser = async (userId) => {
  try {
    const vehiclesRef = collection(db, "vehicles");
    const q = query(vehiclesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting vehicles: ", error);
    throw error;
  }
};

// Atualizar um veículo existente
export const updateVehicle = async (vehicleId, updatedData) => {
  try {
    const vehicleRef = doc(db, "vehicles", vehicleId);
    await updateDoc(vehicleRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error updating vehicle: ", error);
    throw error;
  }
};

// Função auxiliar para deletar todas as fotos de um veículo
const deleteVehiclePhotos = async (userId, vehicleId) => {
  try {
    // Referência para a pasta do veículo no Storage
    const folderRef = ref(storage, `vehicles/${userId}/${vehicleId}/`);

    // Lista todos os arquivos na pasta
    const fileList = await listAll(folderRef);

    // Deleta cada arquivo encontrado
    const deletePromises = fileList.items.map(fileRef =>
      deleteObject(fileRef)
    );

    await Promise.all(deletePromises);

    return true;
  } catch (error) {
    // Se a pasta não existir, não é um erro crítico
    if (error.code !== 'storage/object-not-found') {
      console.error("Error deleting vehicle photos: ", error);
      throw error;
    }
    return false;
  }
};

// Método para deletar veículo
export const deleteVehicle = async (userId, vehicleId) => {
  try {
    // Primeiro deleta as fotos
    console.log(userId)
    console.log(vehicleId)
    await deleteVehiclePhotos(userId, vehicleId);

    // Depois deleta o documento do veículo
    const vehicleRef = doc(db, "vehicles", vehicleId);
    await deleteDoc(vehicleRef);

    return true;
  } catch (error) {
    console.error("Error deleting vehicle: ", error);
    throw error;
  }
};


// Upload de fotos para o Firebase Storage
export const uploadVehiclePhoto = async (userId, vehicleId, file) => {
  try {
    // Cria uma referência única para o arquivo
    const fileRef = ref(storage, `vehicles/${userId}/${vehicleId}/${Date.now()}_${file.name}`);

    // Faz o upload do arquivo
    await uploadBytes(fileRef, file);

    // Obtém a URL de download
    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading vehicle photo: ", error);
    throw error;
  }
};