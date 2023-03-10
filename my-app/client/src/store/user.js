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
export const me = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get(
          "https://kryptovest.up.railway.app/api/user/me",
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch(setUser({}));
  };
};

export const fetchUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://kryptovest.up.railway.app/api/user/login",
        user
      );
      dispatch(setUser(data));
    } catch (error) {
      window.alert("Please make sure all fields are filled out correctly.");
    }
  };
};

export const createUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://kryptovest.up.railway.app/api/user",
        user
      );
      dispatch(addUser(data));
    } catch (error) {
      console.log(error);
      if (error?.response?.data == "Validation error") {
        window.alert("This email is already in use.");
      } else {
        window.alert("Please make sure all fields are filled out correctly.");
      }
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      "https://kryptovest.up.railway.app/api/user",
      user
    );
    dispatch(editUser(data));
    try {
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(
      `https://kryptovest.up.railway.app/api/user/${id}`
    );
    dispatch(removeUser(data));
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
