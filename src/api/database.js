
import axios from "axios";

// Aqui se establece la conexion

const instance = axios.create({
    baseURL:'http://localhost:5000/api',//esta es la url de nuestro servidor backend
    // withCredentials : true esto se encuentra comentado porque puede afectar a los usuarios no legueados
})

export default instance 


// esto es para hacer funcionar la query de busqueda pero como no se implementarla la dejare por aca 
// import axios from 'axios';

// export const getProducts = async () => {
//     try {
//         const response = await axios.get(`${backendURL}/products`);
//         return response.data;
//     } catch (error) {
//         console.error('Error al obtener productos:', error);
//         return [];
//     }
// };

// Otras funciones para realizar solicitudes API...
