import { SET_CURRENT_USER, LOG_OUT } from "../actionTypes";

function authUser(username) {
  return {
    type: SET_CURRENT_USER,
    payload: {
      username: username
    }
  }
}

function logOut() {
  return {
    type: LOG_OUT
  };
}

export { authUser, logOut };