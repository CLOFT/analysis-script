// load env
import { constants } from '../config/index.js';

// module imports
import axios from 'axios';

// define user role constants
const COMMON_ROLE = 'user';
const ADMIN_ROLE = 'admin';

const getUsers = async () => {
  let users = 0;
  try {
    console.log('Retrieving users ...');
    let result = await axios.get(constants.API_GATEWAY + 'Users');
    users = result.data;
  } catch (error) {
    console.log(error);
  } finally {
    return users;
  }
};

const countCommonUsers = async () => {
  const users = await getUsers();
  return users.filter((u) => u.role == COMMON_ROLE).length;
};

const countAdminUsers = async () => {
  const users = await getUsers();
  return users.filter((u) => u.role == ADMIN_ROLE).length;
};

export default {
  countAdminUsers,
  countCommonUsers,
};
