const initialState = {
    events: [],
    event: {},
    isLoading: false,
    error: null,
    success: false,
  };
  
  const AlleventsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "Get-Events-Pending":
        return {
          ...state,
          isLoading: true,
        };
      case "Get-Events-Success":
        return {
          ...state,
          isLoading: false,
          events: action.payload,
          event: action.payload,
        };
  
      case "Get-Events-Failed":
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
        
  
      default:
        return state;
    }
  };
  
  export default AlleventsReducer;
  