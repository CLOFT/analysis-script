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

export default {
  getAssociatedBracelets,
};
