// import axios
import axios from 'axios';
import { constants } from '../config/index.js';

const getLastDayData = async () => {
  try {
    const res = await axios.get(constants.API_GATEWAY + '?method=lastDay');
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export default {
  getLastDayData,
};

