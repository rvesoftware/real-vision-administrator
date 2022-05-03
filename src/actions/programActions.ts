import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const programConstants =  new constantsTemplate("PROGRAM");
const programActions = new actionsTemplate(programConstants, "programs");

export default programActions;