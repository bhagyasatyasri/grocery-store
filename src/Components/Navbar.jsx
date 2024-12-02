import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);  // Pass the search term to App.jsx
  };

  return (
    <div className="navbar">
      <h2>Shopping</h2>

      {/* Navigation links */}
      <div className="nav-links">
        {/*<Link to="/">Home</Link>*/}
        <Link to="/my-recipes">My Cart</Link>
        <Link to="/recipe-form">Add Item</Link>  {/* Added Create Recipe link */}
      </div>

      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search ..."
        value={searchTerm}
        onChange={handleSearchChange}  // Update search term on change
      />
    </div>
  );
};

export default Navbar;
