// StoreOverview.js
import React, { useState } from "react";
import Stats from "./Stats";
import "./StoreOverview.css";
import usericon from "../../Assets/Mystore/User Thumb.png";
import edit from "../../Assets/Mystore/Edit.png";

const StoreOverview = () => {
  const [storeDetails, setStoreDetails] = useState({
    storeName: "Tech Heaven",
    owner: "Mahendran s",
    category: "Electronics and Gadgets",
    location: "Adayar, Chennai",
    phoneNumber: "+91 4474978754"
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    storeName: "Tech Heaven",
    owner: "Mahendran s",
    category: "Electronics and Gadgets",
    location: "Adayar, Chennai",
    phoneNumber: "+91 4474978754"
  });
  const [ownerImage, setOwnerImage] = useState(null); // State for the uploaded owner image
  const [storeImage, setStoreImage] = useState(null); // State for the uploaded store image

  // Handle opening the modal
  const openModal = () => {
    setEditFormData({ ...storeDetails }); // Load current details into form
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form data and images when closing
    setEditFormData({
      storeName: storeDetails.storeName,
      owner: storeDetails.owner,
      category: storeDetails.category,
      location: storeDetails.location,
      phoneNumber: storeDetails.phoneNumber
    });
    setOwnerImage(null); // Reset owner image preview
    setStoreImage(null); // Reset store image preview
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ownerImage") {
      const file = files[0];
      if (file) {
        setOwnerImage(URL.createObjectURL(file)); // Create preview URL for owner image
      }
    } else if (name === "storeImage") {
      const file = files[0];
      if (file) {
        setStoreImage(URL.createObjectURL(file)); // Create preview URL for store image
      }
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  // Handle form submission
  const handleSave = (e) => {
    e.preventDefault();
    setStoreDetails(editFormData); // Update store details
    // Note: In a real app, upload images to a server and store URLs in storeDetails
    closeModal();
  };

  return (
    <div className="store-overview">
      {/* "My Store" heading at the top */}
      <span className="mystore-name">My Store</span>
      {/* Wrap store-info and Stats in a flex container */}
      <div className="store-content">
        <div className="store-info">
          <div className="store-image-placeholder">
            {storeImage ? (
              <img src={storeImage} alt="Store" className="store-image" />
            ) : (
              <span className="placeholder-text">X</span>
            )}
          </div>
          <div className="store-details">
            <span className="edit-icon" onClick={openModal}>
              <img src={edit} alt="edit Icon" className="edit-icon-img" />
            </span>
            <h2>{storeDetails.storeName}</h2>
            <p className="detail-row">
              <span className="detail-label">Owner:</span>
              <span className="detail-value owner-name">
                <span className="store-userimg">
                  <img
                    src={ownerImage || usericon} // Use uploaded image or default
                    alt="User Icon"
                    className="user-icon-img"
                  />
                </span>
                {storeDetails.owner}
              </span>
            </p>
            <p className="detail-row">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{storeDetails.category}</span>
            </p>
            <p className="detail-row">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{storeDetails.location}</span>
            </p>
            <p className="detail-row">
              <span className="detail-label">Phone Number:</span>
              <span className="detail-value">{storeDetails.phoneNumber}</span>
            </p>
          </div>
        </div>
        <Stats />
      </div>

      {/* Modal for editing store details */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-icon" onClick={closeModal}>
              ×
            </span>
            <h2>Edit Store Details</h2>
            <form onSubmit={handleSave} className="edit-store-form">
              <div className="form-group">
                <label htmlFor="storeImage">Store Image</label>
                <input
                  type="file"
                  id="storeImage"
                  name="storeImage"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                {storeImage && (
                  <img
                    src={storeImage}
                    alt="Store Preview"
                    className="image-preview"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="ownerImage">Owner Image</label>
                <input
                  type="file"
                  id="ownerImage"
                  name="ownerImage"
                  accept="image/*"
                  onChange={handleInputChange}
                />
                {ownerImage && (
                  <img
                    src={ownerImage}
                    alt="Owner Preview"
                    className="image-preview"
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="storeName">Store Name</label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={editFormData.storeName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="owner">Owner</label>
                <input
                  type="text"
                  id="owner"
                  name="owner"
                  value={editFormData.owner}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={editFormData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={editFormData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={editFormData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreOverview;