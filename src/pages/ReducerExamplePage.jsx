import React, { useReducer, useState } from "react";
import { ACTION } from "../utils/consts";

const initState = {
  count: 1,
  color: "black",
  size: 32,
};

function reducer(state, action) {
  switch (action.type) {
    // case "count":
    case ACTION.count:
      return { ...state, count: action.payload };
    // case "color":
    case ACTION.color:
      return { ...state, color: action.payload };
    // case "size":
    case ACTION.size:
      return { ...state, size: action.payload };
    default:
      return state;
  }
}

function ReducerExamplePage() {
  //   const [count, setCount] = useState(1);
  const [state, dispatch] = useReducer(reducer, initState);

  function increment() {
    // setCount(count + 1);
    dispatch({
      //   type: "count",
      type: ACTION.count,
      payload: state.count + 1,
    });
  }

  function decrement() {
    // setCount(count - 1);
    dispatch({
      //   type: "count",
      type: ACTION.count,
      payload: state.count - 1,
    });
  }

  function randomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    dispatch({
      //   type: "color",
      type: ACTION.color,
      payload: `#${color}`,
    });
  }

  function randomSize() {
    const size = Math.floor(Math.random() * 70) + 10;
    // console.log(size);
    dispatch({
      //   type: "size",
      type: ACTION.size,
      payload: size,
    });
  }

  function randomAll() {
    randomColor();
    randomSize();
    Math.random() - 0.5 > 0 ? increment() : decrement();
  }
  return (
    <div>
      {/* <h1>{count}</h1> */}
      {/* <h1>{state.count}</h1> */}
      {/* <h1>
        {state.count}, {state.color}
      </h1> */}
      {/* <h1 style={{ color: state.color }}>{state.count}</h1> */}

      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => randomColor()}>change color</button>
      <button onClick={() => randomSize()}>change font-size</button>
      {/* <button
        onClick={() => {
          randomColor();
          randomSize();
          Math.random() - 0.5 > 0 ? increment() : decrement();
        }}
      >
        random
      </button> */}
      <button onClick={() => randomAll()}>random</button>
      <h1 style={{ color: state.color, fontSize: `${state.size}px` }}>
        {state.count}, {state.color}
      </h1>
    </div>
  );
}

export default ReducerExamplePage;
