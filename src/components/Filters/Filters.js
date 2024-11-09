// src/components/Filters.js
import React, { useState, useEffect  } from 'react';
import { Collapse } from 'react-bootstrap';
import { FaFilter, FaChevronDown } from 'react-icons/fa'; // Import icons
import debounce from 'lodash.debounce';
import './Filters.css'; // Import custom styles
const diamondTypeMapping = {
  'Moissanite Diamond': 'Moissanite',
  'Lab Diamond': 'Lab',
  'Real Dial Diamond': 'Real',
};

const Filters = ({ applyFilters, priceRange: initialPriceRange, purity: initialPurity, diamondType: initialDiamondType, style: initialStyle }) => {
  // Local state for filter controls to avoid unnecessary API calls on every small change
  const [priceRange, setLocalPriceRange] = useState(initialPriceRange);
  const [purity, setLocalPurity] = useState(initialPurity);
  const [diamondType, setLocalDiamondType] = useState(initialDiamondType);
  const [style, setLocalStyle] = useState(initialStyle);

  const [priceOpen, setPriceOpen] = useState(true);
  const [purityOpen, setPurityOpen] = useState(true);
  const [diamondOpen, setDiamondOpen] = useState(true);
  const [styleOpen, setStyleOpen] = useState(true);

   // Handle changes to the filters and debounce the applyFilters call
   useEffect(() => {
    // Create a debounced function inside useEffect
    const debouncedApplyFilters = debounce(() => {
      applyFilters({ priceRange, purity, diamondType, style });
    }, 300);

    debouncedApplyFilters(); // Call the debounced function

    // Cleanup the debounce on unmount
    return () => debouncedApplyFilters.cancel();
  }, [priceRange, purity, diamondType, style, applyFilters]); // Include all dependencies


  // Handle changes to the price range
  const handleRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Math.round(value);
    setLocalPriceRange(newRange);
  };

  const handleCheckboxChange = (filterGroup, value, setFilterGroup) => {
    setFilterGroup(filterGroup.includes(value) ? filterGroup.filter((item) => item !== value) : [...filterGroup, value]);
  };

  // Reset all filters
  const clearFilters = () => {
    setLocalPriceRange([0, 500000]);
    setLocalPurity([]);
    setLocalDiamondType([]);
    setLocalStyle([]);
  };

  return (
    <div className="filters p-8">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 d-flex"><FaFilter className="me-2" /> Filters</h5>
        <button className="btn-clear-all" onClick={clearFilters}>
          Clear All ✕
        </button>
      </div>

      {/* Active Filters */}
      <div className="active-filters">
        {(priceRange[0] !== 0 || priceRange[1] !== 500000) && (
          <span className="filter-tag" onClick={() => setLocalPriceRange([0, 500000])}>
            Price: $ {priceRange[0].toLocaleString()} - $ {priceRange[1].toLocaleString()} ✕
          </span>
        )}
        {purity.length > 0 && purity.map((p) => (
          <span key={p} className="filter-tag" onClick={() => setLocalPurity(purity.filter((item) => item !== p))}>
            Purity: {p} ✕
          </span>
        ))}
        {diamondType.length > 0 && diamondType.map((d) => (
          <span key={d} className="filter-tag" onClick={() => setLocalDiamondType(diamondType.filter((item) => item !== d))}>
            Diamond Type: {d} ✕
          </span>
        ))}
        {style.length > 0 && style.map((s) => (
          <span key={s} className="filter-tag" onClick={() => setLocalStyle(style.filter((item) => item !== s))}>
            Style: {s} ✕
          </span>
        ))}
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <button className="filter-header" onClick={() => setPriceOpen(!priceOpen)}>
          Price <FaChevronDown className={`filter-arrow ${priceOpen ? 'rotate' : ''}`} />
        </button>
        <Collapse in={priceOpen}>
          <div>
            {/* Labels for Min and Max Price */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label htmlFor="minPrice">Min. Price</label>
              <label htmlFor="maxPrice">Max. Price</label>
            </div>
            {/* Min and Max Price Inputs */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <input
                type="number"
                id="minPrice"
                className="form-control"
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(0, +e.target.value)}
              />
              <span className="mx-2">-</span>
              <input
                type="number"
                id="maxPrice"
                className="form-control"
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(1, +e.target.value)}
              />
            </div>

            {/* Dual Range Slider */}
            <div className="dual-range-slider-container mt-3">
              <div className="slider-track" ></div>
              {/* Left Thumb */}
              <input
                type="range"
                min="0"
                max="500000"
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(0, parseInt(e.target.value))}
                className="slider thumb-left"
              />
              {/* Right Thumb */}
              <input
                type="range"
                min="0"
                max="500000"
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(1, parseInt(e.target.value))}
                className="slider thumb-right"
              />
              {/* Selected range background */}
              <div
                className="slider-range"
                style={{
                  left: `${(priceRange[0] / 500000) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / 500000) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Purity Filter */}
      <div className="filter-group">
        <button className="filter-header" onClick={() => setPurityOpen(!purityOpen)}>
          Purity <FaChevronDown className={`filter-arrow ${purityOpen ? 'rotate' : ''}`} />
        </button>
        <Collapse in={purityOpen}>
          <div>
            {['10K', '14K', '18K'].map((level) => (
              <div key={level} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={level}
                  checked={purity.includes(level)}
                  onChange={() => handleCheckboxChange(purity, level, setLocalPurity)}
                />
                <label className="form-check-label" htmlFor={level} style={{ color: purity.includes(level) ? 'black' : 'inherit' }}>
                  {level}
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Diamond Type Filter */}
      <div className="filter-group">
        <button className="filter-header" onClick={() => setDiamondOpen(!diamondOpen)}>
          Diamond Type <FaChevronDown className={`filter-arrow ${diamondOpen ? 'rotate' : ''}`} />
        </button>
        <Collapse in={diamondOpen}>
          <div>
            {Object.entries(diamondTypeMapping).map(([displayValue, backendValue]) => (
              <div key={backendValue} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={backendValue}
                  checked={diamondType.includes(backendValue)}
                  onChange={() => handleCheckboxChange(diamondType, backendValue, setLocalDiamondType)}
                />
                <label className="form-check-label" htmlFor={backendValue} style={{ color: diamondType.includes(backendValue) ? 'black' : 'inherit' }}>
                  {displayValue}
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Style Filter */}
      <div className="filter-group">
        <button className="filter-header" onClick={() => setStyleOpen(!styleOpen)}>
          Style <FaChevronDown className={`filter-arrow ${styleOpen ? 'rotate' : ''}`} />
        </button>
        <Collapse in={styleOpen}>
          <div>
            {['Hip-hop', 'Regular'].map((styleOption) => (
              <div key={styleOption} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={styleOption}
                  checked={style.includes(styleOption)}
                  onChange={() => handleCheckboxChange(style, styleOption, setLocalStyle)}
                />
                <label className="form-check-label" htmlFor={styleOption} style={{ color: style.includes(styleOption) ? 'black' : 'inherit' }}>
                  {styleOption}
                </label>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Filters;
