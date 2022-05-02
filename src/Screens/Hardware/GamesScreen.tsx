import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import gameActions from "../../actions/gameActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { Game } from "../../types/Game";

const GamesScreen = () => {

    const gameList = useSelector((state: any) => state.gameList);
    const { loading, error, data: games } = gameList;

    const gameCreate = useSelector((state: any) => state.gameCreate);
    const { loading: loadingCreate, error: errorCreate, success } = gameCreate;

    const gameUpdate = useSelector((state: any) => state.gameUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = gameUpdate;

    const gameDelete = useSelector((state: any) => state.gameDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = gameDelete;

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const [selectedGame, setSelectedGame] = useState<Game>();

    const [imageUpdate, setImageUpdate] = useState(selectedGame?.image);
    const [nameUpdate, setNameUpdate] = useState(selectedGame?.name);


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
        dispatch(gameActions.create({image, name}) as any);
    }

    const deleteHandler = ({_id}: Game) => {
        dispatch(gameActions.delete(_id) as any)
    }

    const updateStore = async (game: Game) => {
        await setSelectedGame(game);
        await setNameUpdate(game?.name);
        await setImageUpdate(game?.image);
        await setOpenModalUpdate(true);
    }
    const updateHandler = () => {  
        const categoryId = selectedGame?._id;
        dispatch(gameActions.update({_id: categoryId, icon: imageUpdate, name: nameUpdate}) as any)
    }
    

    useEffect(() => {
        const gameConstants = new constants('GAME');

        dispatch(gameActions.list() as any);

        if(success){
            dispatch({type: gameConstants.constants().CREATE_RESET});
            setOpenModal(false);
        }

        if(successUpdate){
            setOpenModalUpdate(false);
            dispatch({type: gameConstants.constants().UPDATE_RESET});
        }

        if(successDelete){
            dispatch({type: gameConstants.constants().DELETE_RESET});
        }
    }, [dispatch, success, successDelete, successUpdate])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>
                        <h2 className="screen-title">Games</h2>
                        <p className="screen-copy">Games for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModal(true)}><span><i className='bx bx-plus'></i></span> <p>Add an game</p></button>

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
                                {games.map(({_id, image, name, createdAt} : Game) => (
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
                        Row per page: 10 1-3 of {games.length}
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
            <h2>Edit Game</h2>
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

export default GamesScreen;