import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const eventConstants =  new constantsTemplate("EVENT");
const eventActions = new actionsTemplate(eventConstants, "events");

export default eventActions;