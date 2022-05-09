import { useEffect, useState } from "react";
import { useDispatch as _useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import brandActions from "../../actions/brandActions";
import categoryActions from "../../actions/categoryActions";
import productActions from "../../actions/productActions";
import quotationActions from "../../actions/quotationActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { DivisaFormater } from "../../utils/divisaFormater";
const QuotationsScreen = () => {

    const quotationList = useSelector((state: any) => state.quotationList);
    const { loading, error, data: quotations } = quotationList;

    const productDelete = useSelector((state: any) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const brandList = useSelector((state: any) => state.brandList);
    const { loading: loadingBrand, error: errorBrand, data: brands } = brandList;


    const [openModal, setOpenModal] = useState(false);

    const dispatch = _useDispatch();

    const deleteHandler = (product: any) => {
        dispatch(productActions.delete(product._id) as any);
    }

    useEffect(() => {

        const productConstants = new constants('PRODUCT');

        if(successDelete){
            productConstants.constants().DELETE_RESET;
        }

        dispatch(quotationActions.list() as any);
    }, [dispatch, successDelete])

    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Quotations</h2>
                        <p className="screen-copy">Quotations for the current period</p>
                    </div>

                    <Link to="/create-product" className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an product</p></Link>

                </div>
                <div className="page-content">

                    {loading ? <LoadingBox /> : (

                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" name="" id="" /></th>
                                    <th>Code</th>
                                    <th>Client</th>
                                    <th>Total</th>
                                    <th>Created At</th>
                                    <th>To contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quotations.map((quotation: any) => (
                                    <tr key={quotation._id}>
                                        <td><input type="checkbox" name="" id="" /></td>                                        
                                        <td>{quotation.code}</td>
                                        <td>{quotation.name}</td>
                                        <td> {DivisaFormater(quotation.price)}</td>
                                        <td><TimeAgo date={quotation.createdAt} /></td>
                                        {/* <td ><span className={product.status ? "active" : "out"}>{product.status ? "Active" : "Out"}</span></td> */}
                                        <td><i className='bx bx-pencil' ></i> <button className="btn-none" onClick={() => deleteHandler(quotation)}> <i className='bx bx-trash-alt' ></i></button> </td>
                                    </tr>
                                ))}
                                <tr>

                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>


                {!loading && (
                    <div className="page-footer">
                        Row per page: 10 1-3 of {quotations.length}
                    </div>
                )}
            </div>
            {openModal && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Team</h2>
                            <button onClick={() => setOpenModal(false)} ><i className='bx bx-x' ></i></button>
                        </div>
                        <div className="modal-inputs">


                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default QuotationsScreen;