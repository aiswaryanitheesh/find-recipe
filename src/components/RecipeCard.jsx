export default function RecipeCard({ meal, onSelect }) {
  return (
    <div
  key={meal.idMeal}
  className="bg-white rounded-lg shadow p-2 sm:p-3 md:p-4 w-40 sm:w-48 md:w-56"
>
  <img
    src={meal.strMealThumb}
    alt={meal.strMeal}
    className="rounded-md h-24 sm:h-28 md:h-36 w-full object-cover"
  />
  <h3 className="text-xs sm:text-sm md:text-base mt-2 text-center">
    {meal.strMeal}
  </h3>
</div>

  );
}
