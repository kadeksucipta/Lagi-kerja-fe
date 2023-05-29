import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import NoticeReducer from "./features/Notice/Reducer";
import counterReducer from "./features/Counter/reducer"
import LoginReducer from "./features/Login/Reducer"

let rootReducers = combineReducers({
    counter: counterReducer,
    login: LoginReducer,
    notice: NoticeReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))
export default store