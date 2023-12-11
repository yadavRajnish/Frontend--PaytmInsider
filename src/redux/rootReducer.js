import { combineReducers } from "redux";
import categoryReducer from "./category/Reducer";
import AlleventsReducer from "./AllEvents/Reducer";
import userReducer from "./user/Reducer";

const rootReducer = combineReducers({
  subcat: categoryReducer,
  event: AlleventsReducer,
  user : userReducer
});

export default rootReducer;
