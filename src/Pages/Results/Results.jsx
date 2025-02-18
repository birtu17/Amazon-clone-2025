import LayOut from "../../components/LayOut/LayOut";
import style from "./results.module.css";
import { useParams } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import {productUrl} from "../../Api/endPoints"

const Results = () => {
  const { categoryName } = useParams();
  console.log(categoryName);
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios.get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {console.log(res);

        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr/>
        <div className={style.productsContainer}>
          {results?.map((product) => (
            <ProductCard  product={product} />
          ))}
        </div>
      </section>
    </LayOut>
  );
};

export default Results;
