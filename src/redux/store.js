import {createStore} from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./reducer";

const myMiddleware = (store) => (next) => (action) => {
    next(action);
}

const store = createStore(rootReducer,applyMiddleware(myMiddleware));
store.subscribe(() => {
    console.log(store.getState());
})
export default store;