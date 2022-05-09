import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const quotationConstants = new constantsTemplate("QUOTATION");
const quotationReducer = new reducerTemplate({constants: quotationConstants});

export default quotationReducer;