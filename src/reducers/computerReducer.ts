import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const computerConstants = new constantsTemplate("COMPUTER");
const computerReducer = new reducerTemplate({constants: computerConstants});

export default computerReducer;