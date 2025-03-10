// ProductCard.js
import React from "react";
import "./ProductCard.css";

const ProductCard = () => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder"></div>
      <div className="product-details">
        <h3>Product Title</h3>
        <p>Egestas elit duis scelerisque ut eu purus aliqum vitae habitasse.</p>
        <div className="product-info">
          {/* Price column on the left */}
          <div className="info-column">
            <div className="info-item">
              <span className="price-name">Price:</span>
            </div>
            <div className="info-item">
              <span className="price-val">$23</span>
            </div>
          </div>
          {/* Stock column on the right */}
          <div className="info-column">
            <div className="info-item">
              <span className="stock-name">In Stock:</span>
            </div>
            <div className="info-item">
              <span className="stock-val">15</span>
            </div>
          </div>
        </div>
        <div className="product-actions">
          <button className="edit-btn">Edit Product</button>
          <button className="delete-btn">Delete Product</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;