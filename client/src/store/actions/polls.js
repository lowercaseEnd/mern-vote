import { LOAD_POLLS, ADD_POLL } from "../actionTypes";

const loadPolls = polls => ({
  type: LOAD_POLLS,
  polls
});

export { loadPolls };