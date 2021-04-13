import formatActionTypes from '../actions/formatActionTypes';

export default function formatReducer(state = [], action) {
  return (action.type === formatActionTypes.LOAD_FORMAT_API) ? [...action.format] : [...state];
}
