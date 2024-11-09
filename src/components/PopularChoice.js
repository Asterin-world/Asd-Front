import React from 'react';
import { useProductContext } from '../hooks/ProductContext';
import ProductCard from './ProductCard/ProductCard';

const PopularChoice = ({title, currentProductId}) => {
  const { popularProducts } = useProductContext();  // Get products from context
  const newTitle = title ? title : "POPULAR CHOICE"
  const productList = title ? 'row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mx-0': 'row row-cols-1 row-cols-md-2 row-cols-lg-5 g-4 mx-0';
  const productShowNumber = title && currentProductId ? 4 : 5
  const filteredProducts = popularProducts.filter((product) => product.product_id !== currentProductId);
  const productsToShow = filteredProducts.length >= productShowNumber ? filteredProducts.slice(0, productShowNumber) : filteredProducts;
  return (
    <div className="my-2">
      <h2 className="text-center fw-bold">{newTitle}</h2>
      <div className="w-12 h-1 mb-4 mx-auto" style={{ backgroundColor: '#B37E56' }}></div>
      <div className={productList}>
        {productsToShow.map((product) => (
          <div key={product.product_id} className="col px-lg-2 px-3">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularChoice;
