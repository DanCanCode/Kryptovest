import axios from "axios";

// ACTION TYPES
const SET_USER = "SET_USER";
const ADD_USER = "ADD_USER";
const UPDATE_USER = "UPDATE_USER";
const DELETE_USER = "DELETE_USER";

// ACTION CREATORS
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const addUser = (user) => {
  return {
    type: ADD_USER,
    user,
  };
};

const editUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const removeUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

// THUNKS
export const fetchUser = (user) => {
  return async (dispatch) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (user) => {
  return async (dispatch) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function userReducer(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case ADD_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    case DELETE_USER:
      return action.user;
    default:
      return state;
  }
}
