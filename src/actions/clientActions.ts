import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const clientConstants =  new constantsTemplate("CLIENT");
const clientActions = new actionsTemplate(clientConstants, "clients");

export default clientActions;