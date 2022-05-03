import { applyMiddleware, combineReducers, compose, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";
import * as RR from 'react-redux';
import teamReducer from "./reducers/teamReducer";
import { uploadReducer } from "./reducers/uploadReducer";
import categoryReducer from "./reducers/categoryReducer";
import brandReducer from "./reducers/brandReducer";
import clientReducer from "./reducers/clientReducer";
import eventReducer from "./reducers/eventReducer";
import pageReducer from "./reducers/pageReducer";
import computerReducer from "./reducers/computerReducer";
import gameReducer from "./reducers/gameReducer";
import programReducer from "./reducers/programReducer";

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

    gameList  : gameReducer.listReducer,
    gameCreate: gameReducer.createReducer,
    gameUpdate: gameReducer.updateReducer,
    gameDelete: gameReducer.deleteReducer,

    programList  : programReducer.listReducer,
    programCreate: programReducer.createReducer,
    programUpdate: programReducer.updateReducer,
    programDelete: programReducer.deleteReducer,

    productList: productReducer.listReducer,
    productCreate: productReducer.createReducer,
    productUpdate: productReducer.updateReducer,
    productDelete: productReducer.deleteReducer,

    computerList:   computerReducer.listReducer,
    computerCreate: computerReducer.createReducer,
    computerUpdate: computerReducer.updateReducer,
    computerDelete: computerReducer.deleteReducer,

    clientList: clientReducer.listReducer,
    clientCreate: clientReducer.createReducer,
    clientUpdate: clientReducer.updateReducer,
    clientDelete: clientReducer.deleteReducer,

    teamList  : teamReducer.listReducer,
    teamCreate: teamReducer.createReducer,
    teamUpdate: teamReducer.updateReducer,
    teamDelete: teamReducer.deleteReducer,

    eventList  : eventReducer.listReducer,
    eventCreate: eventReducer.createReducer,
    eventUpdate: eventReducer.updateReducer,
    eventDelete: eventReducer.deleteReducer,

    pageList  : pageReducer.listReducer,
    pageOne  : pageReducer.oneReducer,
    pageCreate: pageReducer.createReducer,
    pageUpdate: pageReducer.updateReducer,
    pageDelete: pageReducer.deleteReducer,


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