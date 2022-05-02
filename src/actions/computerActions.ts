import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const computerConstants =  new constantsTemplate("COMPUTER");
const computerActions = new actionsTemplate(computerConstants, "computers");

export default computerActions;