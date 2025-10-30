import RecipeCard from "./RecipeCard";
  export default function RecipeList({ meals, onSelect }) {
  if (!meals || meals.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          onClick={() => onSelect(meal.idMeal)}
          className="cursor-pointer bg-white rounded-lg shadow hover:shadow-md p-2 hover:scale-105 transition-transform"
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="rounded-md h-32 w-full object-cover"
          />
          <h3 className="text-sm font-semibold text-center mt-2">
            {meal.strMeal}
          </h3>
        </div>
      ))}
    </div>
  );
}


