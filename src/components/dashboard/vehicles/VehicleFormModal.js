import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  useTheme,
  IconButton,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Close as CloseIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import { uploadVehiclePhoto, addVehicle, updateVehicle, fetchCarBrands, fetchCarModels } from "../../../stores/VeihcleService";

const photoTypes = [
  { id: "front", label: "Frente", description: "Foto frontal do veículo" },
  { id: "side", label: "Lateral", description: "Foto lateral do veículo" },
  { id: "back", label: "Traseira", description: "Foto traseira do veículo" },
  { id: "interior", label: "Interior", description: "Foto do interior do veículo" },
  { id: "trunk", label: "Porta-malas", description: "Foto do porta-malas do veículo" },
];

const VehicleFormModal = ({ open, onClose, onSave, vehicle, isEditing, userId, onFeedback }) => {
  const theme = useTheme();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [photoFiles, setPhotoFiles] = useState({});
  const fileInputsRef = useRef({});
  const [photos, setPhotos] = useState({
    front: "",
    side: "",
    back: "",
    interior: "",
    trunk: "",
  });
  const [errors, setErrors] = useState({});
  const [availableModels, setAvailableModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [brandsLoading, setBrandsLoading] = useState(false);
  const [modelsLoading, setModelsLoading] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);


  // Years for dropdown
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  useEffect(() => {
    const loadBrands = async () => {
      if (open && availableBrands.length === 0) {
        setBrandsLoading(true);
        try {
          const brands = await fetchCarBrands();
          setAvailableBrands(brands);
        } catch (error) {
          console.error("Error loading car brands:", error);
          setErrorMessage("Erro ao carregar marcas de veículos. Por favor, tente novamente.");
        } finally {
          setBrandsLoading(false);
        }
      }
    };

    loadBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Atualiza os modelos disponíveis quando a marca muda
  useEffect(() => {
    const loadModels = async () => {
      if (brand) {
        setModelsLoading(true);
        try {
          const models = await fetchCarModels(brand);
          setAvailableModels(models);
        } catch (error) {
          console.error(`Error loading models for ${brand}:`, error);
          setErrorMessage(`Erro ao carregar modelos da marca ${brand}. Por favor, tente novamente.`);
        } finally {
          setModelsLoading(false);
        }
      } else {
        setAvailableModels([]);
      }
    };

    loadModels();
  }, [brand]);

  useEffect(() => {
    if (vehicle && isEditing) {
      setBrand(vehicle.brand || "");
      setModel(vehicle.model || "");
      setYear(vehicle.year || "");
      setPhotos(vehicle.photos || {
        front: "",
        side: "",
        back: "",
        interior: "",
        trunk: "",
      });
    } else {
      resetForm();
    }
  }, [vehicle, isEditing, open]);

  useEffect(() => {
    if (!open) {
      // Libera todas as URLs temporárias
      Object.values(photoFiles).forEach(fileData => {
        if (fileData?.previewUrl) {
          URL.revokeObjectURL(fileData.previewUrl);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const resetForm = () => {
    setBrand("");
    setModel("");
    setYear("");
    setPhotos({
      front: "",
      side: "",
      back: "",
      interior: "",
      trunk: "",
    });
    setErrors({});
    setErrorMessage("");
    setPhotoFiles({});
    setUploadProgress({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!brand) newErrors.brand = "Marca é obrigatória";
    if (!model) newErrors.model = "Modelo é obrigatório";
    if (!year) newErrors.year = "Ano é obrigatório";

    // Validate all photos
    photoTypes.forEach(type => {
      if (!photos[type.id]) {
        newErrors[`photo_${type.id}`] = `Foto ${type.label.toLowerCase()} é obrigatória`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      //Cria/atualiza o veículo para obter o ID
      const vehicleData = {
        brand,
        model,
        year: parseInt(year),
        photos: photos // Inicialmente vazio, será preenchido com as URLs
      };

      let vehicleId;
      if (isEditing) {
        vehicleId = vehicle.id;
        await updateVehicle(vehicleId, vehicleData);
      } else {
        const newVehicle = await addVehicle(userId, vehicleData);
        vehicleId = newVehicle.id;
      }

      //Faz upload das fotos (se houver arquivos)
      const updatedPhotos = { ...photos };
      let hasPhotosToUpload = false;

      for (const [type, fileData] of Object.entries(photoFiles)) {
        if (fileData?.file) {
          hasPhotosToUpload = true;
          const downloadURL = await uploadVehiclePhoto(userId, vehicleId, fileData.file);
          updatedPhotos[type] = downloadURL;
          URL.revokeObjectURL(fileData.previewUrl);
        }
      }

      //Atualiza o veículo com as URLs das fotos (se necessário)
      if (hasPhotosToUpload) {
        await updateVehicle(vehicleId, { photos: updatedPhotos });
      }

      onFeedback({text: "Veículo atualizado com sucesso!", severity: "success"})
      onSave();
      resetForm();
      onClose();
    } catch (error) {
      onFeedback({text: "Houve um erro ao salvar o veículo!", severity: "error"})
      console.error("Error saving vehicle:", error);
      setErrorMessage("Erro ao salvar veículo. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  const handleFileChange = (type, event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Cria uma URL temporária para pré-visualização
    const previewUrl = URL.createObjectURL(file);

    // Armazena o arquivo e a pré-visualização
    setPhotoFiles(prev => ({
      ...prev,
      [type]: { file, previewUrl }
    }));

    // Atualiza a pré-visualização nas fotos
    setPhotos(prev => ({
      ...prev,
      [type]: previewUrl
    }));

    // Limpa erros
    if (errors[`photo_${type}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`photo_${type}`];
        return newErrors;
      });
    }
  };

  const handleFileUpload = (type, event) => {
    handleFileChange(type, event);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, bgcolor: theme.palette.background.primary }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {isEditing ? "Editar Veículo" : "Adicionar Novo Veículo"}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, bgcolor: theme.palette.background.default }}>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={brand}
              onChange={(_, newValue) => {
                setBrand(newValue || null); // Agora pode ser null ou o objeto completo da marca
                setModel(""); // Reseta o modelo quando a marca muda
                if (newValue && errors.brand) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.brand;
                    return newErrors;
                  });
                }
              }}
              options={availableBrands}
              getOptionLabel={(option) => option?.nome || ""} // Extrai o nome para exibição
              isOptionEqualToValue={(option, value) =>
                option?.codigo === value?.codigo // Compara pelos códigos
              }
              loading={brandsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Marca"
                  required
                  error={!!errors.brand}
                  helperText={errors.brand}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {brandsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={model}
              onChange={(_, newValue) => {
                setModel(newValue || "");
                if (newValue && errors.model) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.model;
                    return newErrors;
                  });
                }
              }}
              options={availableModels}
              disabled={!brand || modelsLoading}
              loading={modelsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Modelo"
                  required
                  error={!!errors.model}
                  helperText={errors.model}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {modelsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Autocomplete
              value={year}
              onChange={(_, newValue) => {
                setYear(newValue || "");
                if (newValue && errors.year) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.year;
                    return newErrors;
                  });
                }
              }}
              options={years}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Ano"
                  required
                  error={!!errors.year}
                  helperText={errors.year}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Fotos do Veículo
            </Typography>
            <Typography variant="body2" color="text.primary" paragraph>
              Adicione as 5 fotos obrigatórias do seu veículo. Todas as fotos são necessárias para prosseguir.
            </Typography>
          </Grid>

          {photoTypes.map(type => (
            <Grid key={type.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                sx={{
                  border: "1px dashed",
                  borderColor: errors[`photo_${type.id}`] ? theme.palette.error.main : "divider",
                  borderRadius: 1,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  minHeight: 200,
                  position: "relative",
                }}
              >
                {photos[type.id] ? (
                  <>
                    <Box
                      component="img"
                      src={photos[type.id]}
                      alt={`Foto ${type.label}`}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        borderRadius: 1,
                        mb: 1,
                      }}
                    />
                    <Button
                      size="small"
                      component="label"
                      sx={{
                        color: theme.palette.primary.main,
                      }}
                    >
                      Alterar foto
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFileUpload(type.id, e)}
                        ref={el => fileInputsRef.current[type.id] = el}
                      />
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => {
                        // Limpa a foto selecionada
                        setPhotos(prev => ({ ...prev, [type.id]: "" }));
                        setPhotoFiles(prev => {
                          const newFiles = { ...prev };
                          if (newFiles[type.id]?.previewUrl) {
                            URL.revokeObjectURL(newFiles[type.id].previewUrl);
                          }
                          delete newFiles[type.id];
                          return newFiles;
                        });
                        // Reseta o input de arquivo
                        if (fileInputsRef.current[type.id]) {
                          fileInputsRef.current[type.id].value = "";
                        }
                      }}
                      sx={{ mt: 1 }}
                    >
                      Remover
                    </Button>
                  </>
                ) : (
                  <>
                    {uploadProgress[type.id] ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <CircularProgress
                          variant="determinate"
                          value={uploadProgress[type.id]}
                          sx={{ mb: 2, color: theme.palette.colors.primary }}
                        />
                        <Typography variant="caption" color="text.primary" >
                          Enviando... {uploadProgress[type.id]}%
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <CloudUploadIcon
                          sx={{
                            fontSize: 40,
                            color: errors[`photo_${type.id}`] ? theme.palette.error.main : "primary.main",
                            mb: 1,
                          }}
                        />
                        <Typography variant="subtitle2" align="center" color="text.primary" gutterBottom>
                          {type.label}
                        </Typography>
                        <Typography variant="body2" color="text.primary" align="center" sx={{ mb: 2 }}>
                          {type.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          component="label"
                          sx={{
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            "&:hover": {
                              borderColor: "#15d5c9",
                              bgcolor: "rgba(24, 232, 219, 0.04)",
                            },
                          }}
                        >
                          Selecionar arquivo
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => handleFileUpload(type.id, e)}
                          />
                        </Button>
                      </>
                    )}
                    {errors[`photo_${type.id}`] && (
                      <FormHelperText error sx={{ position: "absolute", bottom: 8 }}>
                        {errors[`photo_${type.id}`]}
                      </FormHelperText>
                    )}
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: theme.palette.background.default }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || Object.keys(uploadProgress).length > 0}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.primary,
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#15d5c9",
            },
            minWidth: 120,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? "Atualizar" : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleFormModal;