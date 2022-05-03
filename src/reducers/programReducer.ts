import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const programConstants = new constantsTemplate("PROGRAM");
const programReducer = new reducerTemplate({constants: programConstants});

export default programReducer;