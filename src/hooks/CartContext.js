import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Initial state for cart
const initialState = {
  items: [],
};

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.product_id === action.payload.product_id &&
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
      );
    
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity ?? 1;
        return { ...state, items: updatedItems };
      }
    
      return {
        ...state,
        items: [
          ...state.items,
          { ...action.payload, quantity: action.payload.quantity ?? 1 }
        ]
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.product_id === action.payload.product_id &&
              JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            )
        ),
      };

      case 'UPDATE_ITEM_QUANTITY': {
        const updatedItems = state.items.map((item) =>
          item.product_id === action.payload.product_id &&
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        return { ...state, items: updatedItems };
      }

      case 'INCREASE_QUANTITY': {
        const updatedItems = state.items.map((item) =>
          item.product_id === action.payload.product_id &&
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, items: updatedItems };
      }
  
      case 'DECREASE_QUANTITY': {
        const updatedItems = state.items.map((item) =>
          item.product_id === action.payload.product_id &&
          JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        );
        return { ...state, items: updatedItems };
      }

    case 'SET_CART_ITEMS':
      return { ...state, items: action.payload };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Create Cart Context
const CartContext = createContext();

// Cart Provider to wrap around components
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Function to check if the user is logged in
  const isUserLoggedIn = () => {
    return !!localStorage.getItem('authToken');  // Check for token
  };

  // Fetch cart data from localStorage or API based on the user’s authentication state
  useEffect(() => {
    const loadCartData = async () => {
      const localCartData = localStorage.getItem('cart');

      if (isUserLoggedIn()) {
        try {
          // const response = await axios.get('/api/cart');  // Fetch cart from API for logged-in user
          // const cartItems = response.data.items;
          // dispatch({ type: 'SET_CART_ITEMS', payload: cartItems });
        } catch (error) {
          console.error('Failed to fetch cart from API', error);
        }
      } else if (localCartData) {
        // Only set cart items if they exist in localStorage
        dispatch({ type: 'SET_CART_ITEMS', payload: JSON.parse(localCartData) });
      } else {
        dispatch({ type: 'SET_CART_ITEMS', payload: [] });
      }
    };

    loadCartData();
  }, []);

  // Save cart data to localStorage on state change (for guest users)
  useEffect(() => {
    if (!isUserLoggedIn()) {
      if (state.items.length > 0) {
        // Save only if there are items in the cart
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    }
  }, [state.items]);

  // Sync cart with backend for logged-in users (on state change)
  useEffect(() => {
    const syncCartWithBackend = async () => {
      if (isUserLoggedIn()) {
        try {
          // await axios.post('/api/cart', { items: state.items });  // Sync cart to backend
        } catch (error) {
          console.error('Failed to sync cart with backend', error);
        }
      }
    };
    syncCartWithBackend();
  }, [state.items]);

  const handleRemoveItem = (product_id, options) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { product_id, options } });
  
    if (isUserLoggedIn()) {
      // Uncomment if using an API call
      // axios.delete(`/api/cart/${product_id}`, { data: { options } }).catch((error) => {
      //   console.error('Failed to remove item from backend', error);
      // });
    } else {
      const updatedCart = state.items.filter(
        (item) =>
          !(item.product_id === product_id && JSON.stringify(item.options) === JSON.stringify(options))
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  
  return <CartContext.Provider value={{ state, dispatch, handleRemoveItem }}>{children}</CartContext.Provider>;
};

// Custom hook to use Cart context
export const useCart = () => useContext(CartContext);