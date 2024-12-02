import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import RecipeDetail from './Components/RecipeDetail';
import RecipeForm from './Components/RecipeForm';
import MyRecipes from './Components/MyRecipes';
import Navbar from './Components/Navbar';
import EditRecipe from './Components/EditRecipe'; // Import the EditRecipe component
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search term change
  const handleSearch = (term) => {
    setSearchTerm(term);  // Update the search term when typed
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <div className="app-container">
        <Routes>
          {/* Home page with search functionality */}
          <Route path="/" element={<Home searchTerm={searchTerm} />} />

          {/* Recipe Form (for creating new recipes) */}
          <Route path="/recipe-form" element={<RecipeForm />} />

          {/* My Recipes page (list of user's own recipes) */}
          <Route path="/my-recipes" element={<MyRecipes />} />

          {/* Recipe Detail page */}
          <Route path="/recipes/:id" element={<RecipeDetail />} />

          {/* Edit Recipe page */}
          <Route path="/edit-recipe/:id" element={<EditRecipe />} /> {/* Added the route for editing */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
