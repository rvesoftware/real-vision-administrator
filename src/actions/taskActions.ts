import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const taskConstants =  new constantsTemplate("TASK");
const taskActions = new actionsTemplate(taskConstants, "tasks");

export default taskActions;