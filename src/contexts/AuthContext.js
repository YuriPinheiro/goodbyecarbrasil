import { createContext, useContext, useEffect, useState } from "react";
import { getRedirectResult, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../stores/FirebaseStore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await signOut(auth);
      // O onAuthStateChanged irá detectar a mudança e atualizar o estado do user
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    getResult();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getResult = async () => {
    
     const result = await getRedirectResult(auth);
     console.log(result)
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);