// ! API для отправки запросов на сервер
export const API = "http://localhost:8000/computers";
// ! выносим ACTION в отдельную константу во избежении ошибок
export const ACTION = {
  count: "count",
  color: "color",
  size: "size",
  products: "products",
  oneProduct: "oneProduct",
};
