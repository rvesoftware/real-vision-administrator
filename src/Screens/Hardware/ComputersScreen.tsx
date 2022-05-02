import { useEffect, useState } from "react";
import { useDispatch as _useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import brandActions from "../../actions/brandActions";
import categoryActions from "../../actions/categoryActions";
import computerActions from "../../actions/computerActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { DivisaFormater } from "../../utils/divisaFormater";
const ComputersScreen = () => {

    const computerList = useSelector((state: any) => state.computerList);
    const { loading, error, data: computers } = computerList;

    const computerDelete = useSelector((state: any) => state.computerDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = computerDelete;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const brandList = useSelector((state: any) => state.brandList);
    const { loading: loadingBrand, error: errorBrand, data: brands } = brandList;


    const [openModal, setOpenModal] = useState(false);

    const dispatch = _useDispatch();

    const deleteHandler = (computer: any) => {
        dispatch(computerActions.delete(computer._id) as any);
    }

    useEffect(() => {

        const computerConstants = new constants('COMPUTER');

        if(successDelete){
            computerConstants.constants().DELETE_RESET;
        }

        dispatch(computerActions.list() as any);
        dispatch(categoryActions.list() as any);
        dispatch(brandActions.list() as any);
    }, [dispatch, successDelete])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Computers</h2>
                        <p className="screen-copy">Computers for the current period</p>
                    </div>

                    <Link to="/create-computer" className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an computer</p></Link>

                </div>
                <div className="page-content">

                    {loading ? <LoadingBox /> : (

                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" name="" id="" /></th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Wattage</th>
                                    <th>Created At</th>
                                    <th>Status</th>
                                    <th>To contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {computers.map((computer: any) => (
                                    <tr key={computer._id}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td className="list-image"><img src={computer.image} alt="" />{computer.name}</td>
                                        
                                        {!loadingBrand && (
                                            <>
                                                {brands.filter((brand: any) => brand._id == computer.brand)
                                                    .map((brand: any) => (
                                                        <td key={brand._id}>{brand.name}</td>
                                                    ))}
                                            </>

                                        )}
                                        {!loadingCategory && (
                                            <>
                                                {categories.filter((category: any) => category._id == computer.category)
                                                    .map((category: any) => (
                                                        <td key={category._id}>{category.name}</td>
                                                    ))}
                                            </>

                                        )}


                                        <td> {DivisaFormater(computer.price)}</td>
                                        <td>{computer.wattage}W</td>
                                        <td><TimeAgo date={computer.createdAt} /></td>
                                        <td ><span className={computer.status ? "active" : "out"}>{computer.status ? "Active" : "Out"}</span></td>
                                        <td><i className='bx bx-pencil' ></i> <button className="btn-none" onClick={() => deleteHandler(computer)}> <i className='bx bx-trash-alt' ></i></button> </td>
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
                        Row per page: 10 1-3 of {computers.length}
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

export default ComputersScreen;