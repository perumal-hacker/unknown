// ProductSection.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductSection.css';

const ProductSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    primaryImage: null,
    otherImages: [],
    productTitle: '',
    productDescription: '',
    price: '',
    stock: ''
  });

  // Handle opening the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form data when closing
    setFormData({
      primaryImage: null,
      otherImages: [],
      productTitle: '',
      productDescription: '',
      price: '',
      stock: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'primaryImage') {
      setFormData({ ...formData, primaryImage: files[0] });
    } else if (name === 'otherImages') {
      if (files.length <= 10) {
        setFormData({ ...formData, otherImages: Array.from(files) });
      } else {
        alert('You can upload a maximum of 10 images.');
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data (placeholder for actual submission logic)
    console.log('Form Data Submitted:', formData);
    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="products-section">
      {/* Header section with title and search/add controls */}
      <div className="products-header">
        <h2>Products</h2>
        <div className="search-add">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Product by Name"
              className="search-input"
            />
          </div>
          <button onClick={openModal}>Add New Products</button>
        </div>
      </div>
      {/* Grid to display product cards */}
      <div className="products-grid">
        {Array(6).fill().map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>

      {/* Modal for adding a new product */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-icon" onClick={closeModal}>
              ×
            </span>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit} className="add-product-form">
              <div className="form-group">
                <label htmlFor="primaryImage">Primary Image</label>
                <input
                  type="file"
                  id="primaryImage"
                  name="primaryImage"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="otherImages">Other Images (Max 10)</label>
                <input
                  type="file"
                  id="otherImages"
                  name="otherImages"
                  accept="image/*"
                  multiple
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productTitle">Product Title</label>
                <input
                  type="text"
                  id="productTitle"
                  name="productTitle"
                  value={formData.productTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Product Description</label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSection;