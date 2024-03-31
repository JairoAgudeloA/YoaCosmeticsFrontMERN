import React, { useEffect } from 'react';
import { url_image } from '../api/axios';
import { useProduct } from '../context/ProductContext';
import { useCart,useCartDispatchs } from '../context/CartContext'

export const SearchResultsPage = ({ search }) => {
  const cart = useCart();
  const dispatch = useCartDispatchs();
  const { products, getProducts } = useProduct();

//   useEffect(() => {
//     // Verificar si products no es undefined antes de filtrar
//     if (products) {
//       // Filtrar los productos basados en el término de búsqueda
//       const filteredResults = products.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//     }
//   }, [products, searchTerm]);

     const results = !search ? products : products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));


     useEffect(() => {
     getProducts();
      }, []);
 
  return (
    <>
      <h2>Resultados de la búsqueda para "{search}":</h2>
    <section className="contenido-container" >
    {results.map((product) => (
        <div className="contenido" key={product._id}>
            <img src={`${url_image}${product.productImage}`} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button
            onClick={() =>{
                dispatch({type:'addproductincart',product:product})
            }}>AÑADIR</button>
        </div>
    ))}
    </section>
    </>
  );
};
