import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import programActions from "../../actions/programActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { Program } from "../../types/Program";

const ProgramsScreen = () => {

    const programList = useSelector((state: any) => state.programList);
    const { loading, error, data: programs } = programList;

    const programCreate = useSelector((state: any) => state.programCreate);
    const { loading: loadingCreate, error: errorCreate, success } = programCreate;

    const programUpdate = useSelector((state: any) => state.programUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = programUpdate;

    const programDelete = useSelector((state: any) => state.programDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = programDelete;

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const [selectedProgram, setSelectedProgram] = useState<Program>();

    const [imageUpdate, setImageUpdate] = useState(selectedProgram?.image);
    const [nameUpdate, setNameUpdate] = useState(selectedProgram?.name);


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
            setImage(data.secure_url);
        } catch (err) {
            console.log(err)
        }
    }


    const createCategory = () => {
        dispatch(programActions.create({image, name}) as any);
    }

    const deleteHandler = ({_id}: Program) => {
        dispatch(programActions.delete(_id) as any)
    }

    const updateStore = async (program: Program) => {
        await setSelectedProgram(program);
        await setNameUpdate(program?.name);
        await setImageUpdate(program?.image);
        await setOpenModalUpdate(true);
    }
    const updateHandler = () => {  
        const categoryId = selectedProgram?._id;
        dispatch(programActions.update({_id: categoryId, icon: imageUpdate, name: nameUpdate}) as any)
    }
    

    useEffect(() => {
        const programConstants = new constants('PROGRAM');

        dispatch(programActions.list() as any);

        if(success){
            dispatch({type: programConstants.constants().CREATE_RESET});
            setOpenModal(false);
        }

        if(successUpdate){
            setOpenModalUpdate(false);
            dispatch({type: programConstants.constants().UPDATE_RESET});
        }

        if(successDelete){
            dispatch({type: programConstants.constants().DELETE_RESET});
        }
    }, [dispatch, success, successDelete, successUpdate])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Programs</h2>
                        <p className="screen-copy">Programs for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModal(true)}><span><i className='bx bx-plus'></i></span> <p>Add an program</p></button>

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
                                {programs.map(({_id, image, name, createdAt} : Program) => (
                                    <tr key={_id}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td className="list-image"><img src={image} alt="" /> {name}</td>
                                        <td><TimeAgo date={createdAt || ""} /></td>
                                        <td> <button className="btn-none"onClick={() => updateStore({_id, image, name, createdAt})} > <i className='bx bx-pencil' ></i></button>  <button className="btn-none" onClick={() => deleteHandler({_id, name})}> <i className='bx bx-trash-alt' ></i> </button></td>
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
                        Row per page: 10 1-3 of {programs.length}
                    </div>
                )}
            </div>
            {openModal && (

<div className="modal">
    <div className="modal-content">
        <div className="modal-header">
            <h2>Add Program</h2>
            <button onClick={() => setOpenModal(false)} ><i className='bx bx-x' ></i></button>
        </div>
        <div className="modal-inputs">
            <input type="text" placeholder="Name" name="" id="" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="file" name="" id="" onChange={(e) => uploadHandler(e, "featuredImage")} />
            <img src={image} alt="" />
        </div>
        <button className="btn-success" onClick={createCategory}>Crear</button>
    </div>
</div>
)}

{openModalUpdate && (

<div className="modal">
    <div className="modal-content">
        <div className="modal-header">
            <h2>Edit Program</h2>
            <button onClick={() => setOpenModalUpdate(false)} ><i className='bx bx-x' ></i></button>
        </div>
        <div className="modal-inputs">
            <input type="text" placeholder="Name" name="" id="" value={nameUpdate} onChange={(e) => setNameUpdate(e.target.value.toUpperCase())} />
            <input type="file" name="" id="" onChange={(e) => uploadHandler(e, "featuredImage")} />
            <img src={imageUpdate} alt="" />
        </div>
        <button className="btn-success" onClick={updateHandler}>Update</button>
    </div>
</div>
)}
        </>
    )
}

export default ProgramsScreen;