import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import RecipeSearch from './components/RecipeSearch';
import RecipeList from './components/RecipeList';
import MealPlan from './components/MealPlan';
import SavedRecipes from './components/SavedRecipes';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="#home">Recipe Finder</a>
            {user && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Search</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/saved-recipes">Saved Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/meal-plan">Meal Plan</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <RecipeSearch setRecipes={setRecipes} />
                  <RecipeList recipes={recipes} user={user} />
                </>
              }
            />
            <Route path="/saved-recipes" element={<SavedRecipes user={user} />} />
            <Route path="/meal-plan" element={<MealPlan user={user} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;