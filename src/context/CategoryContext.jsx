import { useState ,useEffect} from "react";
import { createContext, useContext} from "react";
import { createCategoryRequest, getCategoriesRequest } from './../api/categories.js';


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
    

    return (
        <CategoryContext.Provider 
          value={{
            categories,
            getCategories,
                        
            createCategory,

        }}>
        {children}
        </CategoryContext.Provider>
    );
    }
