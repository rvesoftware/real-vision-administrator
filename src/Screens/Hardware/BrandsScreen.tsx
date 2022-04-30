import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import brandActions from "../../actions/brandActions";
import categoryActions from "../../actions/categoryActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { Brand } from "../../types/Brand";
import { Category } from "../../types/Category";

const BrandsScreen = () => {

    const brandList = useSelector((state: any) => state.brandList);
    const { loading, error, data: brands } = brandList;

    const brandCreate = useSelector((state: any) => state.brandCreate);
    const { loading: loadingCreate, error: errorCreate, success } = brandCreate;

    const brandUpdate = useSelector((state: any) => state.brandUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = brandUpdate;

    const brandDelete = useSelector((state: any) => state.brandDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = brandDelete;

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");

    const [selectedBrand, setSelectedBrand] = useState<Brand>();

    const [nameUpdate, setNameUpdate] = useState(selectedBrand?.name);


    const dispatch = useDispatch();

    const createBrand = () => {
        dispatch(brandActions.create({ name }) as any);
    }

    const deleteHandler = ({ _id }: Brand) => {
        dispatch(brandActions.delete(_id) as any)
    }

    const updateStore = async (brand: Brand) => {
        await setSelectedBrand(brand);
        await setNameUpdate(brand?.name);
        await setOpenModalUpdate(true);
    }
    const updateHandler = () => {
        const brandId = selectedBrand?._id;
        dispatch(brandActions.update({ _id: brandId, name: nameUpdate }) as any)
    }


    useEffect(() => {
        const brandConstants = new constants('BRAND');

        dispatch(brandActions.list() as any);

        if (success) {
            dispatch({ type: brandConstants.constants().CREATE_RESET });
            setOpenModal(false);
        }

        if (successUpdate) {
            setOpenModalUpdate(false);
            dispatch({ type: brandConstants.constants().UPDATE_RESET });
        }

        if (successDelete) {
            dispatch({ type: brandConstants.constants().DELETE_RESET });
        }
    }, [dispatch, success, successDelete, successUpdate])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Brands</h2>
                        <p className="screen-copy">Brands for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModal(true)}><span><i className='bx bx-plus'></i></span> <p>Add an brand</p></button>

                </div>
                <div className="page-content">

                    {loading ? <LoadingBox /> : (

                        <table>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" name="" id="" /></th>
                                    <th>Name</th>
                                    <th>Created At</th>
                                    <th>To contact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.sort((a:any, b:any) => a.name.localeCompare(b.name))
                                .map(({ _id, name, createdAt }: Category) => (
                                    <tr key={_id}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td>{name}</td>
                                        <td><TimeAgo date={createdAt || ""} /></td>
                                        <td> <button className="btn-none" onClick={() => updateStore({ _id, name, createdAt })} > <i className='bx bx-pencil' ></i></button>  <button className="btn-none" onClick={() => deleteHandler({ _id, name })}> <i className='bx bx-trash-alt' ></i> </button></td>
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
                        Row per page: 10 1-3 of {brands.length}
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
                            <input type="text" placeholder="Name" name="" id="" value={name} onChange={(e) => setName(e.target.value.toUpperCase())} />
                        </div>
                        <button className="btn-success" onClick={createBrand}>Crear</button>
                    </div>
                </div>
            )}

            {openModalUpdate && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Edit Category</h2>
                            <button onClick={() => setOpenModalUpdate(false)} ><i className='bx bx-x' ></i></button>
                        </div>
                        <div className="modal-inputs">
                            <input type="text" placeholder="Name" name="" id="" value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value.toUpperCase())} />
                        </div>
                        <button className="btn-success" onClick={updateHandler}>Update</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default BrandsScreen;