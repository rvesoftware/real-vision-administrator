import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const clientConstants = new constantsTemplate("CLIENT");
const clientReducer = new reducerTemplate({constants: clientConstants});

export default clientReducer;