import React, { useState } from "react";
import NavItem from "./NavItem";
import UserSection from "./UserSection";
import styles from "./Header.module.css";

const navItems = ["Dashboard", "Product", "Request", "Order", "Meeting", "Help Desk"];

function Header() {
  const [activeItem, setActiveItem] = useState("Product"); // Default active
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <img 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db90a54ff78344f1c12479e6f157c93e7f26086c418bdea53ca1c4e2c02da74b?apiKey=b7dde77ca8de46239c4205de9625fdd3&" 
        alt="Company Logo" 
        className={styles.logo} 
      />

      {/* Hamburger Menu Button (Visible on Mobile) */}
      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={menuOpen ? `${styles.bar} ${styles.bar1} ${styles.open}` : `${styles.bar} ${styles.bar1}`} />
        <div className={menuOpen ? `${styles.bar} ${styles.bar2} ${styles.open}` : `${styles.bar} ${styles.bar2}`} />
        <div className={menuOpen ? `${styles.bar} ${styles.bar3} ${styles.open}` : `${styles.bar} ${styles.bar3}`} />
      </div>

      {/* Navigation Menu */}
      <nav className={`${styles.navContainer} ${menuOpen ? styles.showMenu : ""}`}>
        <ul className={styles.navMenu}>
          {navItems.map((label) => (
            <NavItem 
              key={label} 
              label={label} 
              isActive={activeItem === label} 
              onClick={() => {
                setActiveItem(label);
                setMenuOpen(false); // Close menu after clicking in mobile view
              }} 
            />
          ))}
        </ul>
      </nav>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <button className={styles.notificationButton} aria-label="Notifications">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/803ad92fe095182aa3abaad49a66f6a65303ffb243a912a33ace51e32039b6dd?apiKey=b7dde77ca8de46239c4205de9625fdd3&" 
            alt="Notification Icon" 
            className={styles.notificationIcon} 
          />
        </button>

        <UserSection
          avatarSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/bd3e71622679409659781f5be6b98ba64bd632f90f9de61344cb8c8824a6ecd0?apiKey=b7dde77ca8de46239c4205de9625fdd3&"
          userName="Mahendran S"
        />
      </div>
    </header>
  );
}

export default Header;
