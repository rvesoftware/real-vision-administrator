import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const gameConstants =  new constantsTemplate("GAME");
const gameActions = new actionsTemplate(gameConstants, "games");

export default gameActions;