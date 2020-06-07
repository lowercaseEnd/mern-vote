import { createStore } from "redux";

const initialState = {
  posts: [{id: 1, title: "test"}],
  username: "",
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "ADD_POST") {
    return Object.assign({}, state, {
      posts: state.posts.concat(action.payload)
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
      posts: state.posts.concat(action.payload)
    };
  }
  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
