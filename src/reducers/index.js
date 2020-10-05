import {SET_ARTICLE, SET_USER} from "../actions";

function userReducer(state = [], action) {
  switch (action.type) {
    case SET_USER:
      state = JSON.parse(JSON.stringify(action.payload));
      return state;
    default:
      return state
  }
}

function articleReducer(state = [], action) {
  switch (action.type) {
    case SET_ARTICLE:
      state = JSON.parse(JSON.stringify(action.payload));
      return state;
    default:
      return state
  }
}

export {
  userReducer,
  articleReducer
};