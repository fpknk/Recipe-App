import React from 'react';
import './App.css';

function Recipe({ title, calories, image, ingredients }) {
  return (
    <div className='container'>
      <h1>{title}</h1>
      <p className='text'>{calories.toFixed(0)} Calories</p>
      <ul>
        {ingredients.map((ingredient) => (
          <li className='text'>{ingredient.text}</li>
        ))}
      </ul>
      <img src={image} alt='' />
    </div>
  );
}

export default Recipe;
