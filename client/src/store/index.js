import { createStore } from "redux";
import rootReducer from "./reducers/index";

const initialState = {
  polls: [],
  username: "",
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_CURRENT_USER") {
    return Object.assign({}, state, {
      username: action.payload.username,
      loggedIn: !!action.payload.username
    })
  }
  if (action.type === "LOAD_POLLS") {
    return {
      ...state,
      polls: state.polls.concat(action.payload)
    };
  }
  if (action.type === "LOG_OUT") {
    return {
      ...state,
      loggedIn: false,
      username: ""
    };
  }
  return state;
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
