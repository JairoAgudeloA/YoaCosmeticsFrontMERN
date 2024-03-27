import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const UserRoleContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserRole = () => useContext(UserRoleContext);

// Proveedor del contexto
export const UserRoleProvider = ({ children }) => {
  // Aquí podrías obtener el rol del usuario de donde lo almacenes (por ejemplo, desde el estado, localStorage, cookies, etc.)
  const [userRole, setUserRole] = useState('');

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
