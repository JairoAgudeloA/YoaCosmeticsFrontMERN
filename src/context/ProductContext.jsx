import {createContext,useContext} from 'react';
import {useState,useEffect} from 'react';   
import {createProductRequest,getProductsRequest,deleteProductRequest,getProductRequest,updateProductRequest} from './../api/products.js';

export const ProductContext = createContext();

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
}

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    // clear errors after 3 seconds
    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]);
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [errors]);

    const getProducts = async () => {
        try {
            const res = await getProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getProduct = async (id) => {
        try {
            
        // const res = await getProductsRequest();
        // if (searchTerm) {
        //     // Filtrar productos basados en el término de búsqueda
        //     const filteredProducts = res.data.filter(product =>
        //         product.name.toLowerCase().includes(searchTerm.toLowerCase())
        //     );
        //     setProducts(filteredProducts);
        // } else {
        //     // Si no hay término de búsqueda, obtener todos los productos
        //     setProducts(res.data);
        // }
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }

    const createProduct = async (product) => {
        try {
            const res = await createProductRequest(product);
            console.log(res.data);
        } catch (error) {
            console.error(error.data.message);
        }
    }

    const updateProduct = async (id,product) => {
        try {
            const res = await updateProductRequest(id,product);
            console.log(res.data);
        } catch (error) {
            console.error(error.data.message);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const res = await deleteProductRequest(id);
            if(res.status === 204) setProducts(products.filter((product) => product._id !== id));
            console.log(res.data);
        } catch (error) {
            console.error(error.data.message);
        }
    }

    return (
        <ProductContext.Provider 
        value={{
            products,
            getProducts, 
            createProduct, 
            getProduct, 
            updateProduct, 
            deleteProduct, 
            errors, 
            setErrors }}>
            {children}
        </ProductContext.Provider>
    )
}