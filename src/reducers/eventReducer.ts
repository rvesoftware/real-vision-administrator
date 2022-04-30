import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const eventConstants = new constantsTemplate("EVENT");
const eventReducer = new reducerTemplate({constants: eventConstants});

export default eventReducer;