import { useState } from "react";

/**
 * SearchBar props:
 * - onSearch(ingredientsArray)
 *
 * UI: input + "Add" button -> creates ingredient tags.
 * Clicking "Search Recipes" calls onSearch with the array.
 */
export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    const val = input.trim();
    if (!val) return;
    // avoid duplicates (case-insensitive)
    if (ingredients.some((i) => i.toLowerCase() === val.toLowerCase())) {
      setInput("");
      return;
    }
    setIngredients((prev) => [...prev, val]);
    setInput("");
  };

  const removeIngredient = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
    if (e.key === ",") {
      // if user types comma, treat it as separator
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSearchClick = () => {
    onSearch(ingredients);
  };

  const handleClear = () => {
    setIngredients([]);
    setInput("");
    onSearch([]); // optionally clear results
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type ingredient and press Add (or Enter). e.g. chicken"
          className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={addIngredient}
          className="bg-emerald-500 text-white px-3 rounded-r-lg hover:bg-emerald-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
          >
            <span>{ing}</span>
            <button
              onClick={() => removeIngredient(idx)}
              className="text-emerald-700/80 hover:text-emerald-900"
              aria-label={`Remove ${ing}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSearchClick}
          className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Search Recipes
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
