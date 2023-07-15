import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NewProductContext from "./components/context/NewProductContext";
import ProductContext from "./components/context/ProductContext";

//! самый главный у нас index js
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // оборачиваем в BrowserRouter именно он дает возможность переходить по станицам
  <BrowserRouter>
    <ProductContext>
      {/* 3 шаг  */}
      <NewProductContext>
        <App />
      </NewProductContext>
    </ProductContext>
  </BrowserRouter>
);
