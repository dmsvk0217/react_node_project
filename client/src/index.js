import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./_reducers/index";
import { composeWithDevTools } from "redux-devtools-extension"; // 개발자 도구
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); // 기존 store 내보내기

export const persistor = persistStore(store); // persist store 내보내기

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
