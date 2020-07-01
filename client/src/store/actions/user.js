import { SET_CURRENT_USER } from "../actionTypes";

function authUser(username) {
  return {
    type: SET_CURRENT_USER,
    payload: {
      username: username
    }
  }
}

export { authUser };