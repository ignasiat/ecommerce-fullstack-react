import axios from 'axios';
import formatActionTypes from './formatActionTypes';
import constant from '../../constants';

export default function loadFormatApi() {
  return async (dispatch) => {
    const { data } = await axios.get(constant.URL_API_FORMAT);
    dispatch({
      type: formatActionTypes.LOAD_FORMAT_API,
      format: data
    });
  };
}
