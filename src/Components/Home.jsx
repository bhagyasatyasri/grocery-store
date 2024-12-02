import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';  // Import the CSS for Home component

const Home = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from the server
    axios.get('http://localhost:5001/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("Error fetching recipes:", error);
      });
  }, []);  // This runs once when the component mounts

  // Filter recipes based on the search term (case-insensitive)
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())  // Ensure case insensitivity
  );

  return (
    <div className="home">
      <h1>SHOPPING MART </h1>
      <div className="recipe-list">
        {filteredRecipes.length === 0 ? (
          <p>No Items found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>{recipe.prepTime}</p>
              <Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">shop </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
