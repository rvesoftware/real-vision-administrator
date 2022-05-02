import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const gameConstants = new constantsTemplate("GAME");
const gameReducer = new reducerTemplate({constants: gameConstants});

export default gameReducer;