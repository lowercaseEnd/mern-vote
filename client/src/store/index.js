import { createStore } from "redux";

const initialState = {
  polls: [{id: 1, title: "test"}],
  username: "",
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_POST") {
    return Object.assign({}, state, {
      polls: state.polls.concat(action.payload)
    });
  }
  if (action.type === "SET_CURRENT_USER") {
    return Object.assign({}, state, {
      username: action.payload.username,
      loggedIn: !!action.payload.username
    })
  }
  if (action.type === "LOAD_POSTS") {
    return {
      ...state,
      polls: state.polls.concat(action.payload)
    };
  }
  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
