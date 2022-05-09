import axios from "axios";

const URL = "https://real-vision-api.herokuapp.com";
// const URL = "http://localhost:4500";

import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const adminConstants =  new constantsTemplate("ADMIN");
const adminActions = new actionsTemplate(adminConstants, "admins");

export const signin = (username:any, password:any) => async (dispatch:any) => {
    dispatch({ type: 'ADMIN_SIGNIN_REQUEST', payload: { username, password } });
    try {
      const { data } = await axios.post(`${URL}/admins`, { username, password });

      dispatch({ type: 'ADMIN_SIGNIN_SUCCESS', payload: data });
      window.location.href = "/"
      localStorage.setItem('adminInfo', JSON.stringify(data));
    } catch (error:any) {
      dispatch({
        type: 'ADMIN_SIGNIN_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const signout = () => (dispatch:any) => {
    localStorage.removeItem('adminInfo');
    dispatch({type: 'ADMIN_SIGNOUT'});
}

export default adminActions;
