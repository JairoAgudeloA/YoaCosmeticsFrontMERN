import { createContext, useContext, useReducer,useEffect } from "react";

{/*Aca he creado los contexts*/}
export const CartItemsContext = createContext();
export const CartItemsDispatchContext = createContext();


{/*Aca he uso un custom hook para usar los contexts*/}
export const useCart = () => {
    if (!useContext(CartItemsContext)) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return useContext(CartItemsContext);
}

{/*Aca he uso un custom hook para usar los contexts*/}
export const useCartDispatchs = () => {
    if (!useContext(CartItemsDispatchContext)) {
        throw new Error('useCartDispatchs must be used within a CartProvider');
    }
    return useContext(CartItemsDispatchContext);
}

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'addproductincart':
            if (state.find(product => product._id === action.product._id)) {
                return state.map(product => {
                    if (product._id === action.product._id) {
                        return { ...product, count: product.count + 1 };
                    }
                    return product;
                });
            }
            return [...state, { ...action.product, count: 1 }];
        
        case 'subtractquantityproduct':
            return state.map(product => {
                if (product._id === action.product._id) {
                    return { ...product, count: product.count - 1 };
                }
                return product;
            }); 
        
        case 'deleteproduct':
            return state.filter(product => product._id !== action.product._id);

        case 'removeallproducts':
            return [];

        case 'editquantityproduct':
            return state.map(product => {
                if (product._id === action.product._id) {
                    return { ...product, count: action.count }; 
                }
                return product;
                });
        default:
        
    }
}

{/*Aca he creado el provider*/}

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartItemsContext.Provider value={cart}>
            <CartItemsDispatchContext.Provider value={dispatch}>
                {children}
            </CartItemsDispatchContext.Provider>
        </CartItemsContext.Provider>
    );
}




























// import { createContext, useContext, useReducer} from "react";

// export const CartContext = createContext();//creamos el contexto de carrito
// export const CartReducerDispatchContext = createContext();//creamos el contexto de los dispatchs de carrito

// export const useCart = () => {
//     return useContext(CartContext);
// }
// export const useCartDispatchs = () => {
//     return useContext(CartReducerDispatchContext);
// }

// const cartReducer = (state, action) => {
//     switch (action.type) {
//         case 'addproduct':
//             return [...state, action.product];
//         case 'deleteproduct':
//             return state.filter(product => product.id !== action.id);
//         case 'removeallproducts':
//             return [];
//         case 'editcountproduct':
//             return state.map(product => {
//                 if (product.id === action.id) {
//                     return { ...product, count: action.count };
//                 }
//                 return product;
//             }); 
//         default:
//             return state;
//     }
// }
// export const CartProvider = ({ children }) => { 
//     const [cart, dispatch] = useReducer(cartReducer, []);
//     return (
//         <CartContext.Provider value={cart}>
//             <CartReducerDispatchContext.Provider value={dispatch}>
//                 {children}
//             </CartReducerDispatchContext.Provider>
//         </CartContext.Provider>
//     );
// }




