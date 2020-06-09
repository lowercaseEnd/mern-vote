import { combineReducers } from "redux";

import { addPost, loadPosts } from "./polls";

export default combineReducers({
  addPost,
  loadPosts
});