import CategoryCard from "./CategoryCard";
import { categoryInfo } from "./categoryInfo";
import style from "./Category.module.css";
const CategoryMain = () => {
  return (
    <div className={style.categoryContainer}>
      {categoryInfo?.map((info, index) => (
        <CategoryCard
          key={index}
          data={info}
        />
      ))}
    </div>
  );
};

export default CategoryMain;
