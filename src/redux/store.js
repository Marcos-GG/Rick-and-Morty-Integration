// import { createStore } from "redux";
// import reducer from "./reducer";

// const store = createStore(reducer);

// export default store;

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";

const composeEnhacer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose; //esta linea sirve para conectar nuestra app con la extension REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
  reducer,
  composeEnhacer(applyMiddleware(thunkMiddleware)) // esta linea sirve para hacer peticiones a una api/servidor
);

export default store;
