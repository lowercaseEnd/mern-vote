import { LOAD_POLLS } from "../actionTypes";

function loadPolls(polls) {
  return {
    type: LOAD_POLLS,
    payload: polls
  };
};

export { loadPolls };