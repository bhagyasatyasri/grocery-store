import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './RecipeForm.css';

const RecipeForm = () => {
  const { id } = useParams(); // Get 'id' from the URL params
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: '',
    image: '',
    prepTime: '',
    ingredients: '',
    steps: '',
  });

  // Fetch the recipe data if editing an existing recipe
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5001/recipes/${id}`)
        .then((response) => {
          setRecipe(response.data); // Populate form with existing recipe data
        })
        .catch((error) => {
          console.error('Error fetching recipe data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(','),
      steps: recipe.steps.split(','),
    };

    const request = id
      ? axios.put(`http://localhost:5001/recipes/${id}`, newRecipe) // Update existing recipe if 'id' exists
      : axios.post('http://localhost:5001/recipes', newRecipe); // Create new recipe if no 'id'

    request
      .then((response) => {
        alert('Item Saved Successfully!');
        navigate('/');
      })
      .catch((error) => {
        console.error('There was an error saving the Item!', error);
      });
  };

  return (
    <div className="recipe-form">
      <h2>Add Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="prepTime"
            value={recipe.prepTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time to Deliver </label>
          <input
            type="text"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description </label>
          <input
            type="text"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Item</button>
      </form>
    </div>
  );
};

export default RecipeForm;
