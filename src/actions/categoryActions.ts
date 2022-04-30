import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const categoryConstants =  new constantsTemplate("CATEGORY");
const categoryActions = new actionsTemplate(categoryConstants, "categories");

export default categoryActions;