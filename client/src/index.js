import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import reducers from "./reducers";

const store = createStore(
  reducers,
  composeWithDevTools(compose(applyMiddleware(thunk)))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
