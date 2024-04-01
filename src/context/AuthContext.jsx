import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, profileRequest, updateProfileRequest } from "../api/auth";
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

  // Save auth data to localStorage
  const saveAuthToLocalStorage = (authData) => {
    localStorage.setItem("auth", JSON.stringify(authData));
  };

  // Load auth data from localStorage
  const loadAuthFromLocalStorage = () => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { user, isAuthenticated } = JSON.parse(authData);
      setUser(user);
      setIsAuthenticated(isAuthenticated);
    }
    setLoading(false);
  };

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      navigate("/login");
      alert("Usuario creado con éxito");
      setUser(res.data);
      saveAuthToLocalStorage({ user: res.data, isAuthenticated: true });
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
      saveAuthToLocalStorage({ user: res.data, isAuthenticated: true });
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
        setIsAuthenticated(true);
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
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    // Remove auth data from localStorage when logging out
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    // Load auth data from localStorage when component mounts
    loadAuthFromLocalStorage();
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



//codigo de chatGpt

// import { createContext, useContext, useState, useEffect } from "react";
// import { loginRequest, registerRequest, profileRequest, updateProfileRequest } from "../api/auth";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within a AuthProvider");
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [errors, setErrors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//     // Define una función para guardar el estado de autenticación en el localStorage
//     const saveAuthToLocalStorage = (authData) => {
//       localStorage.setItem("auth", JSON.stringify(authData));
//     };
  
//     // Define una función para cargar el estado de autenticación desde el localStorage
//     const loadAuthFromLocalStorage = () => {
//       const authData = localStorage.getItem("auth");
//       if (authData) {
//         const { user, isAuthenticated } = JSON.parse(authData);
//         setUser(user);
//         setIsAuthenticated(isAuthenticated);
//       }
//       setLoading(false);
//     };
  
//     // Función para cargar el perfil desde el servidor
//     const loadProfileFromServer = async () => {
//       try {
//         const res = await profileRequest();
//         if (res && res.data) {
//           setUser(res.data);
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error('Error al cargar el perfil:', error);
//         setIsAuthenticated(false);
//         setErrors(error.response ? error.response.data : "Error al cargar el perfil");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       // Llama a la función para cargar el estado de autenticación desde el localStorage
//       loadAuthFromLocalStorage();
  
//       // Llama a la función para cargar el perfil desde el servidor
//       loadProfileFromServer();
  
//       // Limpiar errores después de 3 segundos
//       if (errors.length > 0) {
//         const timer = setTimeout(() => {
//           setErrors([]);
//         }, 3000);
//         return () => clearTimeout(timer);
//       }
//     }, [errors]); // Se ejecuta cada vez que cambian los errores
    
//   const signup = async (user) => {
//     try {
//       const res = await registerRequest(user);
//       navigate("/login");
//       alert("Usuario creado con éxito");
//       setUser(res.data);
//       saveAuthToLocalStorage({ user: res.data, isAuthenticated: true });
//     } catch (error) {
//       alert(error.response.data);
//       setErrors(error.response.data);
//     }
//   };

//   const signin = async (user) => {
//     try {
//       const res = await loginRequest(user);
//       setUser(res.data);
//       setIsAuthenticated(true);
//       saveAuthToLocalStorage({ user: res.data, isAuthenticated: true });
//     } catch (error) {
//       console.log(error.response);
//       setErrors(error.response.data);
//     }
//   };

//   const profile = async () => {
//     try {
//       const res = await profileRequest();
//       if (res && res.data) {
//         setUser(res.data);
//       } else {
//         console.error('La respuesta de perfil no tiene la estructura esperada:', res);
//         setErrors("La respuesta de perfil no tiene la estructura esperada");
//       }
//     } catch (error) {
//       console.error('Error al obtener el perfil:', error);
//       setErrors(error.response ? error.response.data : "Error al obtener el perfil");
//     }
//   };

//   // const updateProfile = async (user) => {
//   //   try {
//   //     const res = await updateProfileRequest(user);
//   //     setUser(res.data);
//   //   } catch (error) {
//   //     console.log(error.response);
//   //     setErrors(error.response.data);
//   //   }
//   // };
//   const updateProfile = async (user) => {
//     try {
//       const res = await updateProfileRequest(user);
//       setUser(res.data);
//     } catch (error) {
//       console.error('Error al actualizar el perfil:', error);
//       setErrors(error.response ? error.response.data : "Error al actualizar el perfil");
//     }
//   };
  
//   const logout = () => {
//     Cookies.remove("token");
//     setUser(null);
//     setIsAuthenticated(false);
//     // Elimina los datos de autenticación del localStorage al cerrar sesión
//     localStorage.removeItem("auth");
//   };

//   useEffect(() => {
//     loadAuthFromLocalStorage();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signup,
//         signin,
//         logout,
//         profile,
//         updateProfile,
//         isAuthenticated,
//         errors,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
