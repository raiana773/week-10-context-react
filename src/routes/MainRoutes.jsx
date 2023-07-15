import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import Homme from "../pages/Homme";
import NotFoundPage from "../pages/NotFoundPage";
import ReducerExamplePage from "../pages/ReducerExamplePage";

function MainRoutes() {
  return (
    // ! все Route должны лежать внутри компонента Routes
    <Routes>
      {/* оборачиваем в MainLayout те страницы которые должны слеовать шаблону (в нашем случае навбар) */}
      <Route element={<MainLayout />}>
        {/* path - это путь element - а это элемент */}
        <Route path="/" element={<Homme />} />
        <Route path="/add" element={<AddProductPage />} />
        {/* :id это название ключа под которым будут лежать параметры  */}
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Route>
      {/* Route - на несуществующий путь  */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/reducer" element={<ReducerExamplePage />} />
    </Routes>
  );
}

export default MainRoutes;
