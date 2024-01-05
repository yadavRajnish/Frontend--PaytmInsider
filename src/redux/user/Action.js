import axios from "axios"

export const login = (credentials) => {
    return (dispatch) => {
      dispatch({ type: "LOGIN_PENDING" });
  
      return axios
        .post("https://paytm-insider-backend.onrender.com/sign-in", credentials)
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          return Promise.resolve();
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILED", payload: err.message });
          return Promise.reject();
        });
    };
  };
