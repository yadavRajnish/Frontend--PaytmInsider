// reducers.js
const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_PENDING":
        return {
          ...state,
          isLoading: true,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          error: null,
        };
      case "LOGIN_FAILED":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  