import style from "./Category.module.css";
import { Link } from "react-router";
const CategoryCard = ({data}) => {

  return (
    <div className={style.category}>
      <Link to={`/category/${data.name}`}>
        {/* console.log(/category/${data.name}); */}
        <span>
          <h3>{data.title}</h3>
        </span>
        <img src={data.imageLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
