import React from "react";
import styles from "./Header.module.css";

function NavItem({ label, isActive, onClick }) {
  return (
    <li className={styles.navItem}>
      <button 
        className={`${styles.navButton} ${isActive ? styles.navActive : ""}`} 
        onClick={onClick}
      >
        {label}
      </button>
    </li>
  );
}

export default NavItem;
