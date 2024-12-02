import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    prepTime: '',
    ingredients: '',
    steps: '',
  });

  useEffect(() => {
    // Fetch the recipe to be edited
    axios.get(`http://localhost:5001/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("Error fetching recipe:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the recipe on the server
    axios.put(`http://localhost:5001/recipes/${id}`, recipe)
      .then(response => {
        console.log('Recipe updated');
        navigate(`/recipes/${id}`);  // Redirect to the recipe detail page after editing
      })
      .catch(error => {
        console.error('Error updating recipe:', error);
      });
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time to deliver:</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default RecipeEdit;
