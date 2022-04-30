import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const brandConstants =  new constantsTemplate("BRAND");
const brandActions = new actionsTemplate(brandConstants, "brands");

export default brandActions;