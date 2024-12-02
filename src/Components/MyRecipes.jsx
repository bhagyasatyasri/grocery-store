import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MyRecipes.css';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch the recipes from the server (ensure this is the correct URL)
    axios.get('http://localhost:5001/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the recipes:", error);
      });
  }, []);

  const handleDelete = (id) => {
    // Delete the recipe
    axios.delete(`http://localhost:5001/recipes/${id}`)
      .then(() => {
        setRecipes(recipes.filter(recipe => recipe.id !== id)); // Remove deleted recipe from state
      })
      .catch(error => {
        console.error("Error deleting recipe:", error);
      });
  };

  return (
    <div>
      <h1>SHOPPING MART</h1>
      {recipes.length === 0 ? (
        <p>No Items added yet.</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>{recipe.prepTime}</p>

              {/* Shop Link */}
              <Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">Shop</Link>
              
              {/* Edit Link */}
              <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">Edit</Link>

              {/* Delete Button */}
              <button onClick={() => handleDelete(recipe.id)} className="delete-btn">Delete from cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
