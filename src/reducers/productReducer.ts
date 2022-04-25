import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const productConstants = new constantsTemplate("PRODUCT");
const productReducer = new reducerTemplate({constants: productConstants});

export default productReducer;