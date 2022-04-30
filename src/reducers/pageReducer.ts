import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const pageConstants = new constantsTemplate("PAGE");
const pageReducer = new reducerTemplate({constants: pageConstants});

export default pageReducer;