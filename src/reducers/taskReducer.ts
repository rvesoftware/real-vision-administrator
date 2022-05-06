import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const taskConstants = new constantsTemplate("TASK");
const taskReducer = new reducerTemplate({constants: taskConstants});

export default taskReducer;