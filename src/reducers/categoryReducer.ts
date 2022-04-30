import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const categoryConstants = new constantsTemplate("CATEGORY");
const categoryReducer = new reducerTemplate({constants: categoryConstants});

export default categoryReducer;