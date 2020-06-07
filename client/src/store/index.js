import { createStore } from "redux";

const initialState = {
  posts: [{ id: 1, title: "Test Post" }],
  username: "",
  loggedIn: false
};

const reducer = (state = initialState, action) => {
  console.log(`Action: ${JSON.stringify(action)}`);
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
  return state;
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
