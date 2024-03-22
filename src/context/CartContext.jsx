import { createContext, useContext, useReducer} from "react";

export const CartContext = createContext();//creamos el contexto de carrito
export const CartReducerDispatchContext = createContext();//creamos el contexto de los dispatchs de carrito

export const useCart = () => {
    return useContext(CartContext);
}
export const useCartDispatchs = () => {
    return useContext(CartReducerDispatchContext);
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'addproduct':
            return [...state, action.product];
        case 'deleteproduct':
            return state.filter(product => product.id !== action.id);
        case 'removeallproducts':
            return [];
        case 'editcountproduct':
            return state.map(product => {
                if (product.id === action.id) {
                    return { ...product, count: action.count };
                }
                return product;
            }); 
        default:
            return state;
    }
}
export const CartProvider = ({ children }) => { 
    const [cart, dispatch] = useReducer(cartReducer, []);
    return (
        <CartContext.Provider value={cart}>
            <CartReducerDispatchContext.Provider value={dispatch}>
                {children}
            </CartReducerDispatchContext.Provider>
        </CartContext.Provider>
    );
}




