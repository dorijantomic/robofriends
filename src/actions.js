import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_ERROR,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
} from "./constants";

export const setSearchField = (text) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: text,
});

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        payload: data,
        isPending: false,
        type: REQUEST_ROBOTS_SUCCESS,
      });
    })
    .catch((error) => {
      dispatch({
        isPending: false,
        payload: error,
        type: REQUEST_ROBOTS_ERROR,
      });
    });
};
