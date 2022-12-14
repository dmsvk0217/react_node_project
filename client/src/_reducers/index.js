import { combineReducers } from "redux";
import user from "../_reducers/user_reducer";
import list from "../_reducers/list_reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// config 작성
const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["list"], // target (reducer name)
};

const rootReducer = combineReducers({
  user,
  list,
});

export default persistReducer(persistConfig, rootReducer);
