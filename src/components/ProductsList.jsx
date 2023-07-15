import React, { useContext, useEffect } from "react";
import { newProductContext } from "./context/NewProductContext";
import { productContext } from "./context/ProductContext";
import ProductCard from "./ProductCard";

function ProductsList() {
  // const { products, getProducts } = useContext(productContext);
  // ! 9 -получаем данные из контекста
  const { products, getProducts } = useContext(newProductContext);
  // ! стягиваем продукты(данные) из db.json
  useEffect(() => {
    getProducts();
  }, []);
  // console.log(products);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        // расстояние
        gap: "30px",
      }}
    >
      {/* //! перебипаем массив products и на каждый его элемент возврящяем компонент ProductCard */}
      {products.map((item) => {
        // ! передаем элемент массива через пропс
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
}

export default ProductsList;
