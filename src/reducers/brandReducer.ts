import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const brandConstants = new constantsTemplate("BRAND");
const brandReducer = new reducerTemplate({constants: brandConstants});

export default brandReducer;