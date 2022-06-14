
import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const accountConstants = new constantsTemplate("ACCOUNT");
const accountReducer = new reducerTemplate({constants: accountConstants});

export default accountReducer;
