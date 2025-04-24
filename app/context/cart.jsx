'use client';
import { createContext, useEffect, useReducer } from "react";

// 1. Crear contexto
export const CartContext = createContext();

// Estado inicial con carrito e idDraft
const initialState = {
  cart: [],
  idDraft: null
};

// Reducer actualizado
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    case 'INIT_CART': {
      // Inicializa tanto el carrito como el idDraft
      return {
        ...state,
        cart: actionPayload.cart || initialState.cart,
        idDraft: actionPayload.idDraft || initialState.idDraft
      };
    }
    case 'ADD_TO_CART': {
      const { id } = actionPayload;
      const productInCartIndex = state.cart.findIndex(item => item.id === id);

      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state.cart);
        newCart[productInCartIndex].quantity += 1;
        return { ...state, cart: newCart };
      }

      // Producto no está en el carrito
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...actionPayload,
            quantity: 1
          }
        ]
      };
    }
    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload;
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== id)
      };
    }
    case 'SET_ID_DRAFT': {
      // Actualiza el idDraft
      return {
        ...state,
        idDraft: actionPayload
      };
    }
    case 'CLEAR_CART': {
      // Limpia el carrito y el idDraft
      return initialState;
    }
    case 'REMOVE_ONE_FROM_CART': {
      const { id } = actionPayload;
      const productInCartIndex = state.cart.findIndex(item => item.id === id);

      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state.cart);

        if (newCart[productInCartIndex].quantity <= 1) {
          // Eliminar el producto si su cantidad es 1 o menor
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== id)
          };
        }

        // Reducir la cantidad del producto
        newCart[productInCartIndex].quantity -= 1;
        return { ...state, cart: newCart };
      }

      throw new Error('El producto no se encuentra en el carrito.');
    }
    default:
      return state;
  }
};

// 2. Crear provider
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Leer carrito e idDraft desde localStorage al montar el componente
  useEffect(() => {
    const storedData = localStorage.getItem('cart');
    if (storedData) {
      dispatch({ type: 'INIT_CART', payload: JSON.parse(storedData) });
    }
  }, []);

  // Guardar carrito e idDraft en localStorage cuando cambie el estado
  useEffect(() => {
    if (state.cart.length > 0 || state.idDraft) {
      localStorage.setItem('cart', JSON.stringify(state));
    } else {
      localStorage.removeItem('cart'); // Eliminar si está vacío
    }
  }, [state]);

  // Métodos para gestionar el estado
  const addToCart = (product) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  const removeFromCart = (product) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    });
  const removeOneFromCart = (product) =>
    dispatch({
      type: 'REMOVE_ONE_FROM_CART',
      payload: product
    });
  const clearCart = () =>
    dispatch({
      type: 'CLEAR_CART'
    });
  const setIdDraft = (id) =>
    dispatch({
      type: 'SET_ID_DRAFT',
      payload: id
    });

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        idDraft: state.idDraft,
        addToCart,
        removeOneFromCart,
        removeFromCart,
        clearCart,
        setIdDraft
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
