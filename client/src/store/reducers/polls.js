import { LOAD_POLLS, ADD_POLL } from "../actionTypes";

const loadPosts = (state = [], action) => {
  if (action.type === "LOAD_POLLS") {
    return {
      ...state,
      polls: state.polls.concat(action.payload)
    };
  }
  return state;
}

const addPost = (state = {}, action) => {
  if (action.type === "ADD_POLL") {
    return Object.assign({}, state, {
      polls: state.polls.concat(action.payload)
    });
  }
  return state;
}
export { addPost, loadPosts };