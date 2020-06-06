import { createStore } from "redux";

const initialState = {
  posts: [{ id: 1, title: "Test Post" }],
  signUpModal: {
    open: false
  },
  user: "",
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
      user: action.payload.user,
      loggedIn: !!action.payload.user
    })
  }
  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
