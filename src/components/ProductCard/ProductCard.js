import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { Heart, HeartFill, Plus } from 'react-bootstrap-icons';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import image1 from '../../assets/asd_collections/m_watch.png';
import { useCart } from '../../hooks/CartContext'; // Import the custom hook
import { useWishlist } from '../../hooks/WishListContext';
import CartModal from '../../components/CartModal';

const ProductCard = React.memo(({ product, category, subcategory }) => {

  const navigationLink = subcategory
    ? `/products/${category}/${subcategory}/product/${product.title.replace(/ /g, "-")}?id=${product.product_id}`
    : (category? `/products/${category}/product/${product.title.replace(/ /g, "-")}?id=${product.product_id}` : `/products/product/${product.title.replace(/ /g, "-")}?id=${product.product_id}`);

  const handleCardClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Ensures smooth scrolling
    });
  };
  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const [showCart, setShowCart] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({}); 
  const [displayedPrice, setDisplayedPrice] = useState(null);
  const [saleDisplayPrice, setSaleDisplayPrice] = useState(null);
  const [isOnSale, setIsOnSale] = useState(false);
  // Check if the product is already in the wishlist
  const isInWishlist = wishlistState.items.some((item) => item.product_id === product.product_id);
  useEffect(() => {
    if (product && product.variants && product.options) { // Ensure product, variants, and options are defined
      const matchingVariant = product.variants[0];
      const firstVariant = product.variants[0];
      const defaultOptions = {};
      product.options.forEach((option, index) => {
        defaultOptions[option.name] = firstVariant[`option${index + 1}`];
      });

      if (matchingVariant) {
        setSelectedOptions(defaultOptions);
        setDisplayedPrice(matchingVariant.price);
        setSaleDisplayPrice(matchingVariant.isOnSale  ? matchingVariant.salePrice : null);
        setIsOnSale(matchingVariant.isOnSale);
      } else {
        setDisplayedPrice(product.price);
        setIsOnSale(product.isOnSale);
        setSaleDisplayPrice(product.isOnSale  ? product.salePrice : null);
      }
    }else {
      setDisplayedPrice(product?.price);
      setIsOnSale(product?.isOnSale);
      setSaleDisplayPrice(product?.isOnSale  ? product?.salePrice : null);
    }
  }, [product]);

  const handlePlusClick = () => {
      // Prepare the item to add to the cart
      if (product) {
        console.log(product)
        const variantTitle = product.options
        ? `${product.title} - ${Object.values(selectedOptions).join(" / ")}`
        : product.title;
        console.log(variantTitle, "variantTitlevariantTitlevariantTitlevariantTitle")
        const itemToAdd = {
          product_id: product.product_id,
          title: variantTitle,
          description: product.description,
          isOnSale: isOnSale,
          salePrice: saleDisplayPrice,
          price: displayedPrice,
          quantity: product.quantity || 1,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          options: selectedOptions, // Pass selected options
        };
      // Dispatch the ADD_ITEM action
      cartDispatch({ type: 'ADD_ITEM', payload: itemToAdd });

      // Update the cart in localStorage
      // const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
      // const updatedCart = [...currentCart, itemToAdd];
      // localStorage.setItem('cart', JSON.stringify(updatedCart));
      toggleCart();
    }
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: { product_id: product.product_id } });
    } else {
      wishlistDispatch({
        type: 'ADD_TO_WISHLIST',
        payload: {
          product_id: product.product_id,
          title: product.title,
          image: product.images && product.images.length > 0 ? product.images[0] : '',
          price: product.price,
          salePrice: product.salePrice,
          isOnSale: product.isOnSale,
          brand: product.brand,
        },
      });
    }
  };

  const toggleCart = () => setShowCart((prev) => !prev);
  return (
    <>
      <div className="card border-0 rounded-0 shadow-sm" style={{ width: '360px', height: '380px' }}>
        <div className="position-relative">
          <Link
            to={navigationLink}
            key={product.product_id}
            className="no-underline" // Tailwind CSS class to remove link underline
            style={{ textDecoration: 'none', color: 'inherit' }}
            onClick={handleCardClick} >
            <img src={image1} alt={product.title} className="card-img-top" style={{ padding: '50px', width: '360px', height: "380px", objectFit: 'cover' }} />
            {isOnSale && <span className="badge rounded-0 bg-danger position-absolute top-2 start-2" style={{ fontSize: '0.9rem', padding: '5px 10px' }}>Sale -{product.discount}%</span>}
          </Link>
          <span className='position-absolute top-8 start-2'><i className="bi bi-heart"></i></span>
          {/* Wishlist (Heart) button */}
          <Button
            variant="link"
            className="position-absolute top-2 end-2 p-2"
            style={{ zIndex: 1, backgroundColor: '#f8f8f8', borderRadius: '12px' }}
            onClick={handleWishlistToggle}
          >
            {isInWishlist ? (
              <HeartFill color="red" size={24} />
            ) : (
              <Heart color="black" size={24} />
            )}
          </Button>

          {/* Add to Cart (+) button */}
          <Button
            variant="link"
            className="position-absolute top-14 end-2 p-2"
            style={{ zIndex: 1, backgroundColor: '#f8f8f8', borderRadius: '12px' }}
            onClick={handlePlusClick}
          >
            <Plus color="black" size={24} />
          </Button>
        </div>
      </div>
      <div className=" text-left text-wrap" style={{ padding: '10px' }}>
        <p className="text-muted text-uppercase">{product.brand}</p>
        <h5 className="card-title fw-bold">{product.title}</h5>
        <p className="mb-1">
          {isOnSale && <span className="text-left me-2 fw-bold" style={{ color: '#B37E56' }}>$ {saleDisplayPrice}</span>}
          {isOnSale && displayedPrice && <span className="text-muted text-decoration-line-through">$ {displayedPrice}</span>}
        </p>
        <p className="mb-1">
          {!isOnSale && <span className="me-2 fw-bold" style={{ color: '#B37E56' }}>$ {displayedPrice}</span>}
        </p>
      </div>
      <CartModal show={showCart} handleClose={toggleCart} />
    </>
  );
});

export default ProductCard;
