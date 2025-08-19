import {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router';

interface ProductFilterProps {
  productTypes: string[];
  selectedTypes: string[];
}

export function ProductFilter({productTypes, selectedTypes}: ProductFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Check if we're on mobile and set initial state accordingly
  const [isExpanded, setIsExpanded] = useState(() => {
    // Default to false for SSR/initial render, will be updated in useEffect
    return false;
  });

  // Set the correct initial state based on screen size after component mounts
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    setIsExpanded(!isMobile); // Open on desktop, closed on mobile
  }, []);

  const isNewSelected = searchParams.getAll('tag').includes('new');

  const handleTypeToggle = (productType: string) => {
    const newParams = new URLSearchParams(searchParams);
    const currentTypes = newParams.getAll('product_type');
    
    if (currentTypes.includes(productType)) {
      // Remove the type
      const filteredTypes = currentTypes.filter(type => type !== productType);
      newParams.delete('product_type');
      filteredTypes.forEach(type => newParams.append('product_type', type));
    } else {
      // Add the type
      newParams.append('product_type', productType);
    }
    
    setSearchParams(newParams);
  };

  const handleNewToggle = () => {
    const newParams = new URLSearchParams(searchParams);
    const currentTags = newParams.getAll('tag');
    if (currentTags.includes('new')) {
      const filtered = currentTags.filter((t) => t !== 'new');
      newParams.delete('tag');
      filtered.forEach((t) => newParams.append('tag', t));
    } else {
      newParams.append('tag', 'new');
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('product_type');
    newParams.delete('tag');
    setSearchParams(newParams);
  };

  return (
    <aside className="product-filter-sidebar">
      <div className="filter-container">
        <div className="filter-header">
          <h2 className="filter-title">Filter by</h2>
          {(selectedTypes.length > 0 || isNewSelected) && (
            <button 
              onClick={clearAllFilters}
              className="clear-filters-btn"
            >
              Clear all
            </button>
          )}
        </div>
        
        <div className="filter-accordion">
          <div className="accordion-item">
            <button 
              className="accordion-header"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <span className="accordion-title">Product Type</span>
              <span className="accordion-count">
                {selectedTypes.length > 0 && `(${selectedTypes.length})`}
              </span>
              <svg 
                className={`accordion-icon ${isExpanded ? 'expanded' : ''}`}
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none"
                aria-hidden="true"
              >
                <path 
                  d="M4 6L8 10L12 6" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            
            <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={isNewSelected}
                    onChange={handleNewToggle}
                    className="filter-checkbox"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="filter-label">New</span>
                </label>
                {productTypes.map((type) => (
                  <label key={type} className="filter-option">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="filter-checkbox"
                    />
                    <span className="checkbox-custom"></span>
                    <span className="filter-label">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 