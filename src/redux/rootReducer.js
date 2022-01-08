import { combineReducers } from "redux";
import nasaReducer from "./nasa/nasaReducer";

const rootReducer = combineReducers({
  nasa: nasaReducer,
});

export default rootReducer;
