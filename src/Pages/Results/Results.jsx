import LayOut from "../../components/LayOut/LayOut";
import style from "./results.module.css";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../components/Loader/Loader";

const Results = () => {
  const { categoryName } = useParams();
  console.log(categoryName);
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res);

        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category/{categoryName}</p>
          <hr />
          <div className={style.productsContainer}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        </section>
      )}
    </LayOut>
  );
};

export default Results;
