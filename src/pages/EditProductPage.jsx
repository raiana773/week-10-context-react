import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { newProductContext } from "../components/context/NewProductContext";
import { productContext } from "../components/context/ProductContext";

function EditProductPage() {
  // const { addProduct } = useContext(productContext);
  // const { editProduct, getOneProduct, oneProduct } = useContext(productContext);
  // ! 24 -получаем editProduct, getOneProduct oneProduct из контекста
  const { editProduct, getOneProduct, oneProduct } =
    useContext(newProductContext);
  // ! получаем id из адресной строки (параметры)
  // ! вытаскиваем по ключу id потому что сами указали это в MainRoutes
  const { id } = useParams();
  // ! useNavigate - это хук из react-router-dom что бы переходить по станицам
  const navigate = useNavigate();
  // ! состояние для данных из инпутов которые по умолчанию пустые
  const [formValue, setFormValue] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // ! отправляем запрос на получение данных продукта который мы изменяем
  useEffect(() => {
    // это id из параметков которые мы вытаскиваем
    getOneProduct(id);
  }, []);

  // ! следим за состоянием oneProduct и меняем formValue когда данные пришли чтобы подставить значение в инпуты
  useEffect(() => {
    if (oneProduct) {
      setFormValue(oneProduct);
    }
  }, [oneProduct]);

  // ! функция которая при изменении инпута меняет соответсвующий ключ у состояния formValue
  function handleChance(e) {
    //  копируем formValue во избежании потери старых данных
    //  e.target.name - какой ключ меняем
    //  e.target.value - на что меняем (значение из инпута)
    const obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  //! функция для сохранения изменений
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formValue);
    // addProduct(formValue); //////
    //! проверка на пустые поля
    if (
      !formValue.title.trim() ||
      !formValue.price.trim() ||
      !formValue.description.trim() ||
      !formValue.image.trim()
    ) {
      alert("Заполните поля");
      return;
    }

    //! отправляем запрос на изменение данных продукта в db.json
    editProduct(id, formValue);
    //! возвращаемся на предыдущую страницу
    navigate(-1);
  }

  return (
    <Box
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(e) => handleChance(e)}
        value={formValue.title}
        name="title"
        label="TITLE"
        variant="outlined"
      />
      <TextField
        onChange={(e) => handleChance(e)}
        value={formValue.description}
        // ! ключ который меняет этот инпут
        name="description"
        label="Description"
        variant="outlined"
      />
      <TextField
        onChange={(e) => handleChance(e)}
        value={formValue.price}
        name="price"
        label="Price"
        variant="outlined"
      />
      <TextField
        onChange={(e) => handleChance(e)}
        value={formValue.image}
        name="image"
        label="Image"
        variant="outlined"
      />
      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}

export default EditProductPage;
