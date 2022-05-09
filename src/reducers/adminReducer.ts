
import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const adminConstants = new constantsTemplate("ADMIN");
const adminReducer = new reducerTemplate({constants: adminConstants});


export const adminSigninReducer = (state = {}, action:any) => {
    switch (action.type) {
      case 'ADMIN_SIGNIN_REQUEST':
        return { loading: true };
      case 'ADMIN_SIGNIN_SUCCESS':
        return { loading: false, adminInfo: action.payload };
      case 'ADMIN_SIGNIN_FAIL':
        return { loading: false, error: action.payload };
      case 'ADMIN_SIGNOUT':
        return {};
      default:
        return state;
    }
  };

export default adminReducer;
