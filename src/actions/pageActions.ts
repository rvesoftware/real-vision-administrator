import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const pageConstants =  new constantsTemplate("PAGE");
const pageActions = new actionsTemplate(pageConstants, "pages");

export default pageActions;