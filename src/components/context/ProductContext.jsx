import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import { ACTION, API } from "../../utils/consts";

export const productContext = createContext();

const initialState = {
  products: [],
  oneProduct: null,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.products:
      return { ...state, products: action.payload };
    case ACTION.oneProduct:
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}
function ProductContext({ children }) {
  // const [products, setProducts] = useState([]);
  // const [oneProduct, setOneProduct] = useState(null);
  // сделаем эти два константа с хуком useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  async function getProducts() {
    try {
      const { data } = await axios.get(API);
      // setProducts(data);
      dispatch({
        type: ACTION.products,
        payload: data,
      });
    } catch (e) {
      console.log(e);
    }
  }

  //! отлавливаем не желательные ошибки
  async function addProduct(newProduct) {
    try {
      await axios.post(API, newProduct);
      getProducts();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteProduct(id) {
    await axios.delete(`${API}/${id}`);
    getProducts();
  }

  async function getOneProduct(id) {
    const { data } = await axios.get(`${API}/${id}`);
    // setOneProduct(data);
    dispatch({
      type: ACTION.oneProduct,
      payload: data,
    });
  }

  async function editProduct(id, product) {
    await axios.patch(`${API}/${id}`, product);
    getProducts();
  }

  const values = {
    // products: products,
    products: state.products,
    // oneProduct: oneProduct,
    oneProduct: state.oneProduct,
    getProducts: getProducts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    getOneProduct: getOneProduct,
    editProduct: editProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
}

export default ProductContext;
