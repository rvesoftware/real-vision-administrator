import { applyMiddleware, combineReducers, compose, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";
import * as RR from 'react-redux';
import teamReducer from "./reducers/teamReducer";
import { uploadReducer } from "./reducers/uploadReducer";
import categoryReducer from "./reducers/categoryReducer";
import brandReducer from "./reducers/brandReducer";
import clientReducer from "./reducers/clientReducer";

const initialState = {

}

const reducer = combineReducers({
    brandList  : brandReducer.listReducer,
    brandCreate: brandReducer.createReducer,
    brandUpdate: brandReducer.updateReducer,
    brandDelete: brandReducer.deleteReducer,

    categoryList  : categoryReducer.listReducer,
    categoryCreate: categoryReducer.createReducer,
    categoryUpdate: categoryReducer.updateReducer,
    categoryDelete: categoryReducer.deleteReducer,

    productList: productReducer.listReducer,
    productCreate: productReducer.createReducer,
    productUpdate: productReducer.updateReducer,
    productDelete: productReducer.deleteReducer,

    clientList: clientReducer.listReducer,
    clientCreate: clientReducer.createReducer,
    clientUpdate: clientReducer.updateReducer,
    clientDelete: clientReducer.deleteReducer,

    teamList  : teamReducer.listReducer,
    teamCreate: teamReducer.createReducer,
    teamUpdate: teamReducer.updateReducer,
    teamDelete: teamReducer.deleteReducer,

    uploadImage: uploadReducer,

})

const composeEnhancer =  compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

type StoreEvent = any;
interface Store{
    reviews: string;
}
export const useSelector: RR.TypedUseSelectorHook<Store> = RR.useSelector;
export const useDispatch = () => RR.useDispatch<Dispatch<StoreEvent>>()

export default store;