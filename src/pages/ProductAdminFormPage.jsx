import React, { useEffect } from 'react'
import { useProduct } from '../context/ProductContext'
import {  useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useCategory } from '../context/CategoryContext'
// import { useAuth } from '../context/AuthContext'


const ProductAdminFormPage = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProduct();
  const { categories, getCategories } = useCategory();
  const navigate = useNavigate();
  const params = useParams();
  // const { user } = useAuth();

  useEffect(() => { 
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue('name', product.name);
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('productImage', product.productImage);
        setValue('category', product.category);
      }
    }
    loadProduct();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
  
    // Itera sobre cada campo en los datos del formulario
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        // Si el campo es 'productImage', añade el archivo al formData
        if (key === 'productImage') {
          formData.append(key, data[key][0]);
        } else {
          // Para todos los demás campos, añade el valor al formData
          formData.append(key, data[key]);
        }
      }
    }
  
    try {
      if (params.id) {
        await updateProduct(params.id, formData);
      } else {
        await createProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      // Maneja el error
    }
  }); 

  // const handleImageChange = (e) => {
  //   // Actualiza el estado de la imagen cuando se selecciona un archivo
  //   const imageFile = e.target.files[0];
  //   setProductImage(imageFile);
  // };

  return (
    <>
      <section className='form-container'>
        <form onSubmit={onSubmit}>
          {params.id ? <h1>Editar Producto</h1> : <h1>Crear Producto</h1>}
          <div>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Ingrese Nombre del Producto"
              {...register('name', { required: true })}
            />
            {errors.name && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              placeholder="Ingrese Precio del Producto"
              {...register('price', { required: true })}
            />
            {errors.price && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              id="description"
              placeholder="Ingrese Descripción del Producto"
              {...register('description', { required: true })}
            />
            {errors.description && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="productImage">Imagen</label>
            <input
              type="file"
              id="productImage"
              placeholder="Ingrese URL de la Imagen del Producto"
              {...register('productImage', { required: true })}
            />
            {errors.productImage && <span>Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              {...register('category', { required:false })}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && <span>Este campo es requerido</span>}
          </div>
          {params.id ? <button type="submit">Editar</button> : <button type="submit">Crear</button>}
          <button onClick={() => navigate('/products')}>Cancelar</button>
        </form>
      </section>
    </>
  )
}

export default ProductAdminFormPage
