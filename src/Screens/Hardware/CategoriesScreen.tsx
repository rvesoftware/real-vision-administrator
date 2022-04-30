import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import categoryActions from "../../actions/categoryActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { Category } from "../../types/Category";

const CategoriesScreen = () => {

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading, error, data: categories } = categoryList;

    const categoryCreate = useSelector((state: any) => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success } = categoryCreate;

    const categoryUpdate = useSelector((state: any) => state.categoryUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

    const categoryDelete = useSelector((state: any) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");

    const [selectedCategory, setSelectedCategory] = useState<Category>();

    const [iconUpdate, setIconUpdate] = useState(selectedCategory?.icon);
    const [nameUpdate, setNameUpdate] = useState(selectedCategory?.name);


    const dispatch = useDispatch();

    const uploadHandler = async (e: any, imageField = "image") => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();

        bodyFormData.append('file', file);

    
        try {
            dispatch({ type: "UPLOAD_REQUEST" });

            const { data } = await axios.post("http://localhost:4500/upload-image", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch({ type: "UPLOAD_SUCCESS" });
            setIcon(data.secure_url);
        } catch (err) {
            console.log(err)
        }
    }


    const createCategory = () => {
        dispatch(categoryActions.create({icon, name}) as any);
    }

    const deleteHandler = ({_id}: Category) => {
        dispatch(categoryActions.delete(_id) as any)
    }

    const updateStore = async (category: Category) => {
        await setSelectedCategory(category);
        await setNameUpdate(category?.name);
        await setIconUpdate(category?.icon);
        await setOpenModalUpdate(true);
    }
    const updateHandler = () => {  
        const categoryId = selectedCategory?._id;
        dispatch(categoryActions.update({_id: categoryId, icon: iconUpdate, name: nameUpdate}) as any)
    }
    

    useEffect(() => {
        const categoryConstants = new constants('CATEGORY');

        dispatch(categoryActions.list() as any);

        if(success){
            dispatch({type: categoryConstants.constants().CREATE_RESET});
            setOpenModal(false);
        }

        if(successUpdate){
            setOpenModalUpdate(false);
            dispatch({type: categoryConstants.constants().UPDATE_RESET});
        }

        if(successDelete){
            dispatch({type: categoryConstants.constants().DELETE_RESET});
        }
    }, [dispatch, success, successDelete, successUpdate])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Categories</h2>
                        <p className="screen-copy">Categories for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModal(true)}><span><i className='bx bx-plus'></i></span> <p>Add an category</p></button>

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
                                {categories.map(({_id, icon, name, createdAt} : Category) => (
                                    <tr key={_id}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td className="list-image"><img src={icon} alt="" /> {name}</td>
                                        <td><TimeAgo date={createdAt || ""} /></td>
                                        <td> <button className="btn-none"onClick={() => updateStore({_id, icon, name, createdAt})} > <i className='bx bx-pencil' ></i></button>  <button className="btn-none" onClick={() => deleteHandler({_id, name})}> <i className='bx bx-trash-alt' ></i> </button></td>
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
                        Row per page: 10 1-3 of {categories.length}
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
            <input type="file" name="" id="" onChange={(e) => uploadHandler(e, "featuredImage")} />
            <img src={icon} alt="" />
        </div>
        <button className="btn-success" onClick={createCategory}>Crear</button>
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
            <input type="file" name="" id="" onChange={(e) => uploadHandler(e, "featuredImage")} />
            <img src={iconUpdate} alt="" />
        </div>
        <button className="btn-success" onClick={updateHandler}>Update</button>
    </div>
</div>
)}
        </>
    )
}

export default CategoriesScreen;