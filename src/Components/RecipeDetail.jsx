import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe by ID
    axios.get(`http://localhost:5001/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <div>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p><strong>Price:</strong> {recipe.prepTime}</p>
      <p><strong>Time To Deliver:</strong> {recipe.ingredients}</p>
      <p><strong>Description:</strong> {recipe.steps}</p>
    </div>
  );
};

export default RecipeDetail;
