import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCategory } from '../context/CategoryContext';
import {useNavigate,useParams} from 'react-router-dom';


const CategoryAdminFormPage = () => {
    const { register, handleSubmit,formState: {errors}, setValue } = useForm();
    const {createCategory, getCategory,updateCategory} = useCategory();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadCategory(){
            if(params.id){
                const category = await getCategory(params.id);
                console.log(category)
                setValue('name', category.name);
                setValue('description', category.description);
            }
        }
        loadCategory();
    }, []);

    const onSubmit = handleSubmit( (data) => { 
        const formData = new FormData();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === 'image') {
                    formData.append(key, data[key][0]);
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
        try {
            if (params.id) {
            updateCategory(params.id, data);
        }else{
            createCategory(data);
        }
        console.log(data)
        navigate('/categories');            
        } catch (error) {            
        }      
    });
    

    return (
        <>
            <section className='form-container'>
                <form onSubmit={onSubmit}>
                    {params.id ? <h1>Editar Categoria</h1> : <h1>Crear Categoria</h1>}
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Ingrese Nombre de la Categoria"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Descripción</label>
                        <input
                            type="text"
                            id="description"
                            placeholder="Ingrese Descripción de la Categoria"
                            {...register('description', { required: true })}
                        />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="image">Imagen</label>
                        <input
                            type="file"
                            id="image"
                            {...register('image', { required: true })}
                        />
                        {errors.name && <span>Este campo es requerido</span>}
                    </div>


                    {params.id ? <button type="submit">Editar</button> : <button type="submit">Crear</button>}
                    <button onClick={() => navigate('/categories')}>Cancelar</button>
                </form>
            </section>
        </>
    )
}

export default CategoryAdminFormPage
