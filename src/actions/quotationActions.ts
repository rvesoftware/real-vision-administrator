import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const quotationConstants =  new constantsTemplate("QUOTATION");
const quotationActions = new actionsTemplate(quotationConstants, "quotations");

export default quotationActions;