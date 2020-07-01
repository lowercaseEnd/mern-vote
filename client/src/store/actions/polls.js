import { LOAD_POLLS, ADD_POLL } from "../actionTypes";

function loadPolls(polls) {
  return {
    type: LOAD_POLLS,
    payload: polls
  };
};

export { loadPolls };