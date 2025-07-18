
import React, { createContext, useContext, useReducer, useEffect } from 'react';
const CartContext = createContext();
const initialState = {
  items: [],
  total: 0,
  tableNumber: '',
  customerName: '',
  customerPhone: '',
  deliveryOption: 'surPlace',
};
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && 
                JSON.stringify(item.options) === JSON.stringify(action.payload.options)
      );
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        const newItems = [...state.items, action.payload];
        return {
          ...state,
          items: newItems,
          total: calculateTotal(newItems)
        };
      }
      
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.cartId !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: calculateTotal(filteredItems)
      };
      
    case 'UPDATE_QUANTITY':
      const updatedQuantityItems = state.items.map(item => {
        if (item.cartId === action.payload.cartId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return {
        ...state,
        items: updatedQuantityItems,
        total: calculateTotal(updatedQuantityItems)
      };
      
    case 'UPDATE_CUSTOMER_INFO':
      return {
        ...state,
        ...action.payload
      };
      
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
}
function calculateTotal(items) {
  return items.reduce((total, item) => {
    const itemTotal = (item.price + (item.options?.reduce((optTotal, opt) => optTotal + opt.price, 0) || 0)) * item.quantity;
    return total + itemTotal;
  }, 0);
}
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      dispatch({
        type: 'CLEAR_CART'
      });
      parsedCart.items.forEach(item => {
        dispatch({
          type: 'ADD_ITEM',
          payload: item
        });
      });
      dispatch({
        type: 'UPDATE_CUSTOMER_INFO',
        payload: {
          tableNumber: parsedCart.tableNumber,
          customerName: parsedCart.customerName,
          customerPhone: parsedCart.customerPhone,
          deliveryOption: parsedCart.deliveryOption
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product, quantity = 1, options = [], notes = '') => {
    const cartId = Date.now().toString();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        cartId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        options,
        notes
      }
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: cartId
    });
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { cartId, quantity }
    });
  };

  const updateCustomerInfo = (info) => {
    dispatch({
      type: 'UPDATE_CUSTOMER_INFO',
      payload: info
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCustomerInfo,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}