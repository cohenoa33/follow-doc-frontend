import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { userReducer } from "./reducer/";
import thunkMiddleware from "redux-thunk";

import "./index.css";
import App from "./App";

// const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={createStore(userReducer)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch(fetchBowies())
