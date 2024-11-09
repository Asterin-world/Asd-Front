import React, { createContext, useReducer, useEffect, useContext } from 'react';

// Initial state for wishlist
const initialState = {
  items: [],
};

// Reducer function to manage wishlist state
const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      // Check if the item is already in the wishlist
      const existingItemIndex = state.items.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      if (existingItemIndex >= 0) {
        return state; // Item is already in the wishlist, no changes
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product_id !== action.payload.product_id
        ),
      };

    case 'SET_WISHLIST_ITEMS':
      return { ...state, items: action.payload };

    case 'CLEAR_WISHLIST':
      return initialState;

    default:
      return state;
  }
};

// Create Wishlist Context
const WishlistContext = createContext();

// Wishlist Provider to wrap around components
export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Function to check if the user is logged in
  const isUserLoggedIn = () => {
    return !!localStorage.getItem('authToken'); // Check for token
  };

  // Fetch wishlist data from localStorage or API based on the user’s authentication state
  useEffect(() => {
    const loadWishlistData = async () => {
      const localWishlistData = localStorage.getItem('wishlist');

      if (isUserLoggedIn()) {
        try {
          // const response = await axios.get('/api/wishlist');  // Fetch wishlist from API for logged-in user
          // const wishlistItems = response.data.items;
          // dispatch({ type: 'SET_WISHLIST_ITEMS', payload: wishlistItems });
        } catch (error) {
          console.error('Failed to fetch wishlist from API', error);
        }
      } else if (localWishlistData) {
        dispatch({ type: 'SET_WISHLIST_ITEMS', payload: JSON.parse(localWishlistData) });
      }
    };

    loadWishlistData();
  }, []);

  // Save wishlist data to localStorage on state change (for guest users)
  useEffect(() => {
    if (!isUserLoggedIn()) {
      if (state.items.length > 0) {
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    }
  }, [state.items]);

  // Function to add item to the wishlist
  const addToWishlist = (item) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  // Function to remove item from the wishlist
  const removeFromWishlist = (product_id) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { product_id } });

    if (isUserLoggedIn()) {
      // Sync with backend
      // axios.delete(`/api/wishlist/${product_id}`).catch((error) => {
      //   console.error('Failed to remove item from backend', error);
      // });
    } else {
      const updatedWishlist = state.items.filter(
        (item) => item.product_id !== product_id
      );
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  return (
    <WishlistContext.Provider value={{ state, dispatch, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use Wishlist context
export const useWishlist = () => useContext(WishlistContext);
