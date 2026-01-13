import foodData from "../../src/data/foodData.js"
import FoodCard from "../components/FoodCard/Foodcard.jsx";

function Menu() {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Royal Menu</h2>

      <div className="row g-4">
        {foodData.map(food => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={food.id}>
            <FoodCard food={food} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
