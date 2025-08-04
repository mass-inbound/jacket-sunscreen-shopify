import {useState} from 'react';
import {Link, useSearchParams} from 'react-router';

interface ProductFilterProps {
  productTypes: string[];
  selectedTypes: string[];
}

export function ProductFilter({productTypes, selectedTypes}: ProductFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(true);

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

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('product_type');
    setSearchParams(newParams);
  };

  return (
    <aside className="product-filter-sidebar">
      <div className="filter-container">
        <div className="filter-header">
          <h2 className="filter-title">Filter by</h2>
          {selectedTypes.length > 0 && (
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