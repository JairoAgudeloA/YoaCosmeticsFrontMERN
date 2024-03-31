import '../assets/styles/components/Main.css'
import { useProduct } from '../context/ProductContext'
import { useEffect } from 'react'
import { url_image } from '../api/axios'
import { useCart,useCartDispatchs } from '../context/CartContext'


export const Main = ({search}) => {
    const {products,getProducts} = useProduct();
    const cart = useCart();
    const dispatch = useCartDispatchs();

    const results = !search ? products : products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));


    useEffect(() => {
        getProducts();
      }, []);
    

    return(
        <>
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
    )
}