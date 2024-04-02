import {useContext,createContext} from 'react';
import {useState,useEffect} from 'react';
import { getUserRequest,getUsersRequest,createUserRequest,updateUserRequest,deleteUserRequest } from "../api/user.js";
import {useNavigate} from 'react-router-dom';
const UserContext = createContext();   

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (errors.length > 0) {
    //         const timer = setTimeout(() => {
    //             setErrors([]);
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [errors]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.error(error);
            setErrors(error.res);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error.response.data)
            console.error(error);
            setErrors(error.response);
        }
    };

    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user);
            alert('Usuario creado con éxito');
            navigate('/admin/users');
            console.log(res.data);
        } catch (error) {
            alert(error.response.data);
            setErrors(error.response.data);
        }
    };

    const updateUser = async (id, user) => {
        try {
            const res = await updateUserRequest(id, user);
            alert('Usuario actualizado con éxito');
            navigate('/admin/users');
            console.log(res.data);
        } catch (error) {
            alert(error.response.data)
            setErrors(error.response.data);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            if (res.status === 204) setUsers(users.filter((user) => user._id !== id));
            getUsers();
            alert(res.data);
        } catch (error) {
            alert(error.response.data);
            setErrors(error.response.data);
        }
    };

    return (
        <UserContext.Provider 
        value={{
            users, 
            getUsers, 
            getUser, 
            createUser, 
            updateUser, 
            deleteUser, 
            errors, 
            setErrors}}>
            {children}
        </UserContext.Provider>
    );
}