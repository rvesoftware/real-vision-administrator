import { applyMiddleware, combineReducers, compose, createStore, Dispatch } from "redux";
import thunk from "redux-thunk";
import productReducer from "./reducers/productReducer";
import * as RR from 'react-redux';

const initialState = {

}

const reducer = combineReducers({
    productList: productReducer.listReducer,
    productCreate: productReducer.createReducer,
    productUpdate: productReducer.updateReducer,
    productDelete: productReducer.deleteReducer,
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