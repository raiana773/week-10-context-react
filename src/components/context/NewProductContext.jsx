import axios from "axios";
import React, { createContext, useReducer } from "react";
import { ACTION, API } from "../../utils/consts";

//! 1 cоздаем контекст
// ! экспортируем что бы использовать в других файлах
export const newProductContext = createContext();

// ! 5 - это начальная состояние
const initState = {
  products: [],
  //   ! 12
  oneProduct: null,
};

// ! 6 - функция reducer которое описывает как должно менятся состояние
function reducer(state, action) {
  // ? свич кейс который проверяет action,type и меняет соответсвующие состояние
  switch (action.type) {
    //  выносим ACTION  в отдельную константу во избежании ошибок
    //  описываем кейсы для изменения каждого состояния
    case ACTION.products: // если action.type тайкойто то поменяй нам это
      return { ...state, products: action.payload };
    //   ! 13
    case ACTION.oneProduct:
      return { ...state, oneProduct: action.payload };
    //   по дефолту всегда возвращяем стейт
    default:
      return state;
  }
}

function NewProductContext({ children }) {
  //! 7 - создаем состаяние с useReducer'ом
  const [state, dispatch] = useReducer(reducer, initState);

  // ! 8  создадим функция которая стягивает данные с сервера - функция чтобы получить данные с сервера
  async function getProducts() {
    const { data } = await axios.get(API);
    // чтобы поменять на состояние products
    dispatch({
      type: ACTION.products,
      // payload  на что поменять
      payload: data,
    });
  }

  // ! 11 - функция чтобы получить данные одного обьекта с сервера
  async function getOneProduct(id) {
    const { data } = await axios.get(`${API}/${id}`);

    // ! 14 - // чтобы поменять на состояние oneProduct
    dispatch({
      type: ACTION.oneProduct,
      payload: data,
    });
  }

  // ! 16 - функция для добавления в db.json
  async function addProduct(newProd) {
    await axios.post(API, newProd);
    // стягиваем актуальные данные после добавления
    getProducts();
  }

  // ! 17 - функция для удаления из db.json
  async function deleteProduct(id) {
    await axios.delete(`${API}/${id}`);
    // стягиваем актуальные данные после удаления
    getProducts();
  }

  // ! 18 функция для изменения одного обьекта db.json
  async function editProduct(id, prodEdit) {
    await axios.patch(`${API}/${id}`, prodEdit);
    // стягиваем актуальные данные после изменения
    getProducts();
  }

  //! 4 - данные которые передаем всем дочерним компонентам (элементам )
  const value = {
    // ! 9 , 10 productLIst
    products: state.products,
    // ! 14
    oneProduct: state.oneProduct,
    // создай ключ гетпродукс со значением продуктс
    getProducts,
    // ! 15
    getOneProduct,
    // ! 19
    addProduct,
    // ! 20
    deleteProduct,
    // ! 21
    editProduct,
  };

  //   возвращяем context.Provider который оборачиваеи children
  // именнр он передает все данные которые мы передали в атрибут value
  //! 2 шаг. 3 шаг в индекце
  return (
    <newProductContext.Provider value={value}>
      {children}
    </newProductContext.Provider>
  );
}

export default NewProductContext;
