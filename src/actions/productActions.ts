import constantsTemplate from '../constants/constantsTemplate.js'
import actionsTemplate from './actionsTemplate.js'

const productConstants =  new constantsTemplate("PRODUCT");
const productActions = new actionsTemplate(productConstants, "products");

export default productActions;