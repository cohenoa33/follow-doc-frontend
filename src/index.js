import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { userReducer } from "./reducer/";
import { thunkMiddleware } from "redux-thunk";

import "./index.css";
import App from "./App";

const store = createStore(
  userReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
