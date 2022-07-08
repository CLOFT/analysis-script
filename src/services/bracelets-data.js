// import axios
import axios from 'axios';
import { constants } from '../config/index.js';

const getLastDayData = async () => {
  let data = null;
  try {
    let result = await axios.get(constants.API_GATEWAY + '?method=lastDay');
    data = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    return data;
  }
};

export default {
  getLastDayData,
};
