import { useState ,useEffect} from "react";
import { createContext, useContext} from "react";
import { createCategoryRequest, getCategoriesRequest,deleteCategoryRequest ,getCategoryRequest,updateCategoryRequest} from './../api/categories.js';


export const CategoryContext = createContext();//crear el contexto

export const useCategory = () => { //crear el hook
  const context = useContext(CategoryContext); //obtener el contexto

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
};

export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState([]);
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

    const getCategories = async () => {
        try {
            const res = await getCategoriesRequest();
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
    }


    const createCategory = async (category) => {
        try {
            const res = await createCategoryRequest(category);
            console.log(res.data);

        } catch (error) {
            console.error(error.data.message);
        }
    }
    
    const deleteCategory = async (id) => {
        try {
            const res = await deleteCategoryRequest(id);
            if(res.status === 204) setCategories(categories.filter((category) => category._id !== id));
            console.log(res.data);
            // getCategories();
        } catch (error) {
            console.error(error.data.message);
        }
    }
    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error(error.data.message);
        }
    }
    const updateCategory = async (id,category) => {
        try {
            const res = await updateCategoryRequest(id,category);
            console.log(res.data);
        } catch (error) {
            console.error(error.data.message);
        }
    }

    return (
        <CategoryContext.Provider 
          value={{
            categories,
            getCategories,
            deleteCategory,
            createCategory,
            getCategory,
            updateCategory

        }}>
        {children}
        </CategoryContext.Provider>
    );
    }
