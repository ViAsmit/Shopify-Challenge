import {
  FETCH_NASA_FAILURE,
  FETCH_NASA_SUCCESS,
  FETCH_NASA__REQUEST,
} from "./nasaType";

export const fetchRequest = () => {
  return {
    type: FETCH_NASA__REQUEST,
  };
};

export const fetchSuccess = (users) => {
  return {
    type: FETCH_NASA_SUCCESS,
    payload: users,
  };
};

export const fetchFailure = (error) => {
  return {
    type: FETCH_NASA_FAILURE,
    payload: error,
  };
};

export const fetchData = (startDate, endDate) => {
  let url;
  console.log("Dates", startDate, endDate);
  if (startDate === "" || endDate === "") {
    url =
      "https://api.nasa.gov/planetary/apod?api_key=uA58xnUb8uHVgB887l2jX78bUlEcQJuk1QFxSQcP&count=12";
  } else {
    url = `https://api.nasa.gov/planetary/apod?api_key=uA58xnUb8uHVgB887l2jX78bUlEcQJuk1QFxSQcP&start_date=${startDate}&end_date=${endDate}`;
  }
  return (dispatch) => {
    dispatch(fetchRequest());
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(fetchSuccess(res));
      })
      .catch((error) => {
        dispatch(fetchFailure(error));
      });
  };
};
