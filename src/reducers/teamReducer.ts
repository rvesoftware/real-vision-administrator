import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const teamConstants = new constantsTemplate("TEAM");
const teamReducer = new reducerTemplate({constants: teamConstants});

export default teamReducer;