import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const teamConstants =  new constantsTemplate("TEAM");
const teamActions = new actionsTemplate(teamConstants, "teams");

export default teamActions;