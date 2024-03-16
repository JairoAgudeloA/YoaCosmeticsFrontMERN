
import axios from "axios";

// Aqui se establece la conexion

const instance = axios.create({
    baseURL:'http://localhost:5000/api',//esta es la url de nuestro servidor backend
    withCredentials : true 
})

export default instance 