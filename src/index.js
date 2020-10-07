import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { createStore } from "redux";

import { Provider } from "react-redux";
import followdocReducer from "./reducers/followdocReducer";

import "./index.css";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

const store = createStore(
  followdocReducer,
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
