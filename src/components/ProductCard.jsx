import React, { useContext } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { productContext } from "./context/ProductContext";
import { Link } from "react-router-dom";
import { newProductContext } from "./context/NewProductContext";

// ! получаем item из пропсов
const ProductCard = ({ item }) => {
  // const { deleteProduct } = useContext(productContext);
  // ! 22 - получаем функцию deleteProduct из контекста
  const { deleteProduct } = useContext(newProductContext);
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={item.image}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography sx={{ color: "red" }} variant="h6">
            ${item.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            // ! по нажатию удаляем элемент по id вызываем функцию deleteProduct и передаем id
            onClick={() => deleteProduct(item.id)}
            color="error"
            variant="contained"
            size="small"
          >
            Delete
          </Button>
          <Button
            // ! переходим на станицу edit/{id элемента} чтобы мы смогли достать id из адресной строки на странице  EditProductPage
            component={Link}
            to={`/edit/${item.id}`}
            color="success"
            variant="contained"
            size="small"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductCard;
