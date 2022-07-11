// load env
import { constants } from '../config/index.js';

import axios from 'axios';

export const getHoroscopeBySign = async (sign) => {
  console.log('Retrieving today horoscope ...');
  let description;
  try {
    let result = await axios.post(
      constants.HOROSCOPE_API + '?sign=' + encodeURIComponent(sign)
    );
    description = result.data.description;
  } catch (error) {
    console.log('Error : ', error);
  } finally {
    return description ?? null;
  }
};
