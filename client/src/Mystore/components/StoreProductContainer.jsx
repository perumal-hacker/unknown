// StoreProductContainer.js
import React from 'react';
import StoreOverview from './StoreOverview';
import ProductSection from './ProductSection';
import './StoreProductContainer.css';

const StoreProductContainer = () => {
  return (
    <div className="app-container">
      {/* Render the Store Overview component */}
      <StoreOverview />
      {/* Render the Product Section component */}
      <ProductSection />
    </div>
  );
};

export default StoreProductContainer;