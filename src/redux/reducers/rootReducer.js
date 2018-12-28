import {combineReducers} from "redux";
import pkList from "./pkListReducer";
import pkDetail from "./pkDetailReducer";

export default combineReducers({pkList, pkDetail});