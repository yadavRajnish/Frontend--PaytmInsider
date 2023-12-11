const initialState = {
  categories: [],
  // category: {},
  isLoading: false,
  error: null,
  success: false,
};

const categoryReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    case "Get-Category-Pending":
      return {
        ...state,
        isLoading: true,
      };
    case "Get-Category-Success":
      return {
        ...state,
        isLoading: false,
        // category: action.payload,
        categories : action.payload,
      };

    case "Get-Category-Failed":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
