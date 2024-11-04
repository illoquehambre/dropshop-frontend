import { createContext, useReducer, useEffect } from "react";

//1. crear contexto
export const CartContext = createContext()

const initialState = []
const reducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action
    switch (actionType) {
        case 'INIT_CART': {
            return actionPayload || initialState;
        }
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            console.log(productInCartIndex);

            if (productInCartIndex >= 0) {

                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                return newState
            }

            //producto no está en el carrito
            return [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
        }
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            return state.filter(item => item.id !== id)

        }
        case 'CLEAR_CART': {
            return initialState
        }
        case 'REMOVE_ONE_FROM_CART': {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)

            if (productInCartIndex >= 0) {
                console.log('already in cart');
                if (state[productInCartIndex].quantity <= 1) {
                    return state.filter(item => item.id !== id)

                }
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity -= 1
                return newState
            }

            //producto no está en el carrito
            throw new Error('Este producto no se encuentra en su carrito.')
        }

        default:
            break;
    }
    return state
}
//2. crear provider
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    // Leer carrito desde localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            dispatch({ type: 'INIT_CART', payload: JSON.parse(storedCart) });
        }
    }, []);

    // Guardar carrito en localStorage cuando cambie el estado
    useEffect(() => {
        if (state.length > 0) {
            localStorage.setItem('cart', JSON.stringify(state));
        } else {
            localStorage.removeItem('cart');  // Eliminar si está vacío
        }
    }, [state]);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })
    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })
    const removeOneFromCart = product => dispatch({
        type: 'REMOVE_ONE_FROM_CART',
        payload: product
    })
    const clearCart = product => dispatch({
        type: 'CLEAR_CART'
    })

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeOneFromCart,
            removeFromCart,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

