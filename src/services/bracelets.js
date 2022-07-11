// load env
import { constants } from '../config/index.js';

import axios from 'axios';

const getAssociatedBracelets = async () => {
  let bracelets;
  try {
    let result = await axios.get(constants.API_GATEWAY + 'Bracelets/');
    bracelets = result.data;
    bracelets = bracelets.filter((b) => b.username != null);
  } catch (error) {
    console.log(error);
  } finally {
    return bracelets ?? null;
  }
};

const updateBraceletSerendipity = async (bracelet) => {
  let data;
  try {
    let result = await axios.put(constants.API_GATEWAY + 'Bracelets/');
    data = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    return data ?? null;
  }
};
export default {
  getAssociatedBracelets,
  updateBraceletSerendipity
};
