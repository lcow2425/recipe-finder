import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const MealPlan = ({ user }) => {
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!user) return;
      try {
        const querySnapshot = await getDocs(collection(db, 'users', user.uid, 'mealPlan'));
        const plan = querySnapshot.docs.map((doc) => doc.data());
        setMealPlan(plan);
      } catch (error) {
        console.error('Error fetching meal plan:', error);
      }
    };
    fetchMealPlan();
  }, [user]);

  return (
    <div>
      <h2 className="mb-4">Your Meal Plan</h2>
      {mealPlan.length > 0 ? (
        <div className="row">
          {mealPlan.map((item) => (
            <div className="col-md-4 mb-4" key={`${item.id}-${item.day}`}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Day: {item.day}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No meals planned yet. Add some from the search page!</p>
      )}
    </div>
  );
};

export default MealPlan;