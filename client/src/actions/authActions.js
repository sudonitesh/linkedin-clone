import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login -  get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token); // save token to local storage
      setAuthToken(token); // set token to auth header
      // decode token to get userdata
      const decoded = jwt_decode(token)
      // set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// log out user
export const logoutUser = () => dispatch => {
    // remove from localstorage
    localStorage.removeItem('jwtToken') 
    // remove from auth header for next requests
    setAuthToken(false)
    // set current user to empty object
    dispatch(setCurrentUser({}));    
}