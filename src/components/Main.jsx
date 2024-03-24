import '../assets/styles/components/Main.css'
import { useProduct } from '../context/ProductContext'
import { useEffect } from 'react'
import { url_image } from '../api/axios'
import { useCart } from '../context/CartContext' 
import { useCartDispatchs } from '../context/CartContext'


export const Main = () => {
    const {products,getProducts} = useProduct();
    const cart = useCart();
    const dispatch = useCartDispatchs();

    useEffect(() => {
        getProducts();
      }, []);
    

    return(
        <>
        <section className="contenido-container" >
        {products.map((product) => (
            <div className="contenido" key={product.id}>
                <img src={`${url_image}${product.productImage}`} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button
                onClick={() =>{
                    dispatch({type:'addproduct',product:product})
                }}>AÑADIR</button>
            </div>
        ))}
        </section>
        
        </>
    )
}