import axios from "axios";

export const getAllEvents = () => {
  return (dispatch) => {
    dispatch({ type: "Get-Events-Pending" });
    return axios
      .get("http://localhost:8282/get-events")
      .then((response) => {
        dispatch({ type: "Get-Events-Success", payload: response.data });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({ type: "Get-Events-Failed", payload: error.message });
        return Promise.reject();
      });
  };
};

export const getEventsById = (categoryEventID) => {
  return (dispatch) => {
    dispatch({ type: "Get-Events-Success" });
    return axios
      .get(`http://localhost:8282/get-event-by-id/${categoryEventID}`)
      .then((res) => {
        // console.log(res);
        dispatch({ type: "Get-Events-Success", payload: res.data });
        // console.log(res.data)
        return Promise.resolve();
      })
      .catch((err) => {
        dispatch({ type: "Get-Events-Failed", payload: err.message });
        return Promise.reject();
      });
  };
};

// export const getEventByQuery = (queryId) => {
//   return (dispatch) => {
//     dispatch({ type: "Get-Events-Success" });
//     return axios
//       .get(`http://localhost:8282/get-event-data/?categoryId=${queryId}`)
//       .then((res) => {
//         dispatch({ type: "Get-Events-Success", payload: res.data });
//         return Promise.resolve();
//       })
//       .catch((err) => {
//         dispatch({ type: "Get-Events-Failed", payload: err.message });
//         return Promise.reject();
//       });
//   };
// };

export const getEventByQuery = (eventTag) => {
  return (dispatch) => {
    dispatch({ type: "Get-Events-Success" });
    return axios
      .get(`http://localhost:8282/get-event-categoryid/?eventTag=${eventTag}`)
      .then((res) => {
        dispatch({ type: "Get-Events-Success", payload: res.data });
        return Promise.resolve();
      })
      .catch((err) => {
        dispatch({ type: "Get-Events-Failed", payload: err.message });
        return Promise.reject();
      });
  };
};