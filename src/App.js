import './App.css';
import Recipe from './Recipe';
import { useEffect, useState } from 'react';

const App = () => {
  const appId = '8e561e94';
  const appKey = 'e4f6fba65b88f83d2b3c735bc2f9dc5d';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  //reason we want query instead of search; search will fetch constantly as we type
  // we use query to only fetch when submit the form (onSubmit) hence fetch only one; see useEffect
  //so our useEffect only runs when we have a change in the query

  ///

  //useEffect -> effect post refresh (after DOM updates) -> when we click button it refreshes!
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=%20${appKey}%09`
    );
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input
          className='search-bar'
          type='text'
          value={search}
          onChange={updateSearch}
          placeholder='Enter a recipe'
        />
        <button className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
