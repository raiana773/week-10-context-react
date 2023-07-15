import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { newProductContext } from "../components/context/NewProductContext";
import { productContext } from "../components/context/ProductContext";

function AddProductPage() {
  // const { addProduct } = useContext(productContext);
  // ! 23 - получаем функцию addProduct из контекста
  const { addProduct } = useContext(newProductContext);

  // ! состояние для данных из инпутов которы по умолчанию пустые
  const [formValue, setFormValue] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  // ! функция которая при изменении инпута меняет соответсвующий ключ у состояние formValue
  function handleChance(e) {
    //  копируем formValue во избежании потери старых данных
    //  e.target.name - какой ключ меняет, внутри обькта мы пишем квадратные скобки
    //  e.target.value - на что меняем значение из инпута
    const obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  //! функция для добавления
  function handleSubmit(e) {
    e.preventDefault();
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

    // ! добавляем данные из формы на db.json
    // console.log(formValue);
    addProduct(formValue);
    // ! очищяем инпуты
    setFormValue({
      title: "",
      price: "",
      description: "",
      image: "",
    });
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
        Edit
      </Button>
    </Box>
  );
}

export default AddProductPage;
