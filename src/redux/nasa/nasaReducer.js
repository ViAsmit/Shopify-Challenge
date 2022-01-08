import {
  FETCH_NASA_FAILURE,
  FETCH_NASA_SUCCESS,
  FETCH_NASA__REQUEST,
} from "./nasaType";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const nasaReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NASA__REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NASA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    case FETCH_NASA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default nasaReducer;
