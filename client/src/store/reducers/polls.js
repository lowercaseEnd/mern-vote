import { LOAD_POLLS, ADD_POLL } from "../actionTypes";

const initialPolls = {
  polls: []
};

const loadPosts = (state = initialPolls, action) => {
  if (action.type === LOAD_POLLS || action.type === ADD_POLL) {
    return {
      ...state,
      polls: state.polls.concat(action.payload)
    };
  }
  return state;
}

export { loadPosts };