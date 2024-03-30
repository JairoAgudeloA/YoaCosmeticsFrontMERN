import { createContext, useContext, useState,useEffect } from "react";
import { loginRequest, registerRequest,profileRequest,updateProfileRequest } from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // clear errors after 3 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
        navigate("/login"); 
        alert("Usuario creado con éxito");
        setUser(res.data);
    } catch (error) {
      alert(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const profile = async () => {
    try {
      const res = await profileRequest();
      if (res && res.data) {
        setUser(res.data);
      } else {
        console.error('La respuesta de perfil no tiene la estructura esperada:', res);
        setErrors("La respuesta de perfil no tiene la estructura esperada");
      }
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      setErrors(error.response ? error.response.data : "Error al obtener el perfil");
    }
  };
  

  const updateProfile = async (user) => {
    try {
      const res = await updateProfileRequest(user);
      setUser(res.data);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  }

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        profile,
        updateProfile,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
