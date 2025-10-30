import { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ingredients: array of strings, e.g. ["chicken","tomato"]
  const handleSearch = async (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      setMeals([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const allMealsLists = [];

      // Fetch results for each ingredient
      for (const ingredient of ingredients) {
        // skip empty strings just in case
        const ing = ingredient.trim();
        if (!ing) continue;

        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
            ing
          )}`
        );
        const data = await res.json();
        if (data.meals) {
          allMealsLists.push(data.meals);
        } else {
          // If any ingredient returns no meals, there can be no common meals
          allMealsLists.push([]);
        }
      }

      // If we have no lists, set empty
      if (allMealsLists.length === 0) {
        setMeals([]);
        setLoading(false);
        return;
      }

      // Find intersection: meals that appear in every fetched list
      const intersection = allMealsLists.reduce((acc, list) => {
        if (!acc) return list;
        // filter acc to meals that exist in list (match by idMeal)
        return acc.filter((m) => list.some((x) => x.idMeal === m.idMeal));
      }, allMealsLists[0]);

      setMeals(intersection || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching recipes.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMealDetails = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setSelectedMeal(data.meals ? data.meals[0] : null);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch meal details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-emerald-600 mb-4">
        🍳 Taylor’s Recipe Helper
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-gray-600 mt-4">Loading...</p>}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {!loading && meals.length === 0 && !error && (
        <p className="text-gray-500 mt-6">No recipes yet — add ingredients and search!</p>
      )}

      {!loading && meals.length > 0 && (
        <div className="w-full max-w-5xl mt-6">
          <RecipeList meals={meals} onSelect={fetchMealDetails} />

        </div>
      )}

      {selectedMeal && (
        <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}