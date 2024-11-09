import React, { useState, useCallback, useEffect,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import Banner from '../components/CategoryBanner/Banner';
import Filters from '../components/Filters/Filters';
import Pagination from '../components/Pagination/Pagination';
import Sorting from '../components/Sorting/Sorting';
import Loader from '../components/Loader/Loader';
import { fetchProductsByCategory } from '../services/productService';
import { useDebouncedEffect } from '../hooks/useDebounceEffect';

const ProductListPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [purity, setPurity] = useState([]);
  const [diamondType, setDiamondType] = useState([]);
  const [style, setStyle] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 9;

  // Track if the component is mounted to prevent unnecessary resets
  const isMounted = useRef(false);

  // Extract category and subcategory from the URL path
  const pathSegments = location.pathname.split('/');
  const category = pathSegments[2];
  const subcategory = pathSegments.length > 3 ? pathSegments[3]: '';
 
  // Fetch products from the backend based on filters, sort, and page number
  const fetchProducts = useCallback(
    async (params = {}) => {
      setLoading(true);
      console.log('Fetching products with params:', params); // Debugging log
      try {
        Object.keys(params).forEach((key) => params[key] === null && delete params[key]);
        const data = await fetchProductsByCategory(category, subcategory, params);
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      } finally {
        setLoading(false);
      }
    },
    [category, subcategory]
  );

  useEffect(() => {
    // Reset filters to initial values
    setPriceRange([0, 500000]);
    setPurity([]);
    setDiamondType([]);
    setStyle([]);
    setCurrentPage(1); // Reset to the first page

    // Apply the changes to the product list
    handleFiltersChange({
      priceRange: [0, 500000],
      purity: [],
      diamondType: [],
      style: [],
    });
  }, [category, subcategory]);
  
  // Function to construct the API parameters based on the current filter state
  const getApiParams = useCallback(() => {
    return {
      page: currentPage,
      sort: sortCriteria || null,
      priceRange: priceRange[0] !== 0 || priceRange[1] !== 500000 ? priceRange : null,
      purity: purity.length ? purity.join(',') : null,
      diamondType: diamondType.length ? diamondType.join(',') : null,
      style: style.length ? style.join(',') : null,
    };
  }, [currentPage, sortCriteria, priceRange, purity, diamondType, style]);

  // Debounced effect for filter and sorting changes, excluding currentPage
  useDebouncedEffect(() => {
    if (isMounted.current) {
      setCurrentPage(1); // Reset to first page only when filter or sorting changes
    }
    const params = getApiParams();
    fetchProducts(params);
  }, [priceRange, purity, diamondType, style, sortCriteria], 5000);

  // Effect to handle changes in currentPage separately
  useEffect(() => {
    if (isMounted.current) {
      const params = getApiParams();
      fetchProducts(params);
    }
  }, [currentPage, getApiParams, fetchProducts]); // Track only currentPage changes

  // Ensure that `isMounted` is set to true after the first render
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Sorting handler
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  // Handle applying filters dynamically
  const handleFiltersChange = (filters) => {
    setPriceRange(filters.priceRange || [0, 500000]);
    setPurity(filters.purity || []);
    setDiamondType(filters.diamondType || []);
    setStyle(filters.style || []);
  };

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-page">
      {/* Dynamic Banner for the Product List Page */}
      <Banner category={category} subcategory={subcategory} />
      <div className="p-10">
        {/* Product Title and Sorting Container */}
        {/* <div className=""> */}
          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center product-header px-5">
            <h3 className="product-title">
              {subcategory ? (
                <>Diamond {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} | {totalProducts} Products</>
              ) : (
                <>{category.charAt(0).toUpperCase() + category.slice(1)} Diamond | {totalProducts} Products</>
              )}
            </h3>
              <Sorting sortCriteria={sortCriteria} handleSort={handleSort} />
            </div>
          </div>
        {/* </div> */}

        {/* Display Loading Indicator */}
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            {/* Filters Sidebar */}
            <div className="col-lg-3">
              <Filters
                applyFilters={handleFiltersChange}
                priceRange={priceRange}
                purity={purity}
                diamondType={diamondType}
                style={style}
              />
            </div>

            {/* Main Product List and Pagination */}
            <div className="col-lg-9">
              {/* Product Listing */}
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-0">
                {products.length ? (
                  products.map((product) => (
                    <div key={product.product_id} className="col">
                      <ProductCard product={product} category={category} subcategory={subcategory} />
                    </div>
                  ))
                ) : (
                  <p>No products found for this category.</p>
                )}
              </div>

              {/* Pagination */}
              <div className="pagination-wrapper d-flex justify-content-center align-items-center">
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={totalProducts}
                  paginate={paginate}
                  currentPage={currentPage}
                  totalPages={totalPages} // Pass totalPages to pagination component
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
