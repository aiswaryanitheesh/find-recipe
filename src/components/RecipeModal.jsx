export default function RecipeModal({ meal, onClose }) {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className="fixed inset-0 bg-white/50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-[90%] sm:w-[60%] md:w-[40%] max-h-[75vh] overflow-y-auto relative border border-gray-200"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        <h2 className="text-lg sm:text-xl font-bold text-emerald-600 mb-3 text-center">
          {meal.strMeal}
        </h2>

        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="rounded-md w-full h-32 object-cover mb-3"
        />

        <h3 className="text-base font-semibold mb-1">Ingredients</h3>
        <ul className="list-disc list-inside mb-3 text-sm text-gray-700">
          {ingredients.map((ing, index) => (
            <li key={index}>{ing}</li>
          ))}
        </ul>

        <h3 className="text-base font-semibold mb-1">Instructions</h3>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line"style="{background-color:antiquewhite;}">
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
}
