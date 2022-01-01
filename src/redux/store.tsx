import { compose, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const middlewareEnhancer = applyMiddleware(ReduxThunk);

const composeEnhancers =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(rootReducer, composeEnhancers(middlewareEnhancer));

export type RootState = ReturnType<typeof store.getState>;

export default store;
