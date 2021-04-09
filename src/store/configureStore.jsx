import { createStore, combineReducers, compose } from "redux";
import { playlistReducer } from "./playlist/reducer";
import { authReducer } from "./auth/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  playlist: playlistReducer,
});

const store = createStore(rootReducer, composeEnhancers());
export default store;
