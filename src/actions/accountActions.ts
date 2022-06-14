import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const accountConstants =  new constantsTemplate("ACCOUNT");
const accountActions = new actionsTemplate(accountConstants, "accounts");

export default accountActions;
