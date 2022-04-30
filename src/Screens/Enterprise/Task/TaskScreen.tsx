import List from "../../../components/Task/List";
import TaskCard from "../../../components/Task/TaskCard";
import '../../../styles/task.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { uploadHandler } from "../../../hooks/uploadImage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import teamActions from "../../../actions/teamActions";
import { TasksProps } from "../../../types/TasksProps";
import taskActions from "../../../actions/taskActions";


const TaskScreen = () => {

    const uploadImage = useSelector((state: any) => state.uploadImage)
    const { loading: loadingUpload } = uploadImage;

    const teamList = useSelector((state: any) => state.teamList);
    const { loading, error, data: teams } = teamList;

    const teamCreate = useSelector((state: any) => state.teamCreate);
    const { loading: loadingCreate, error: errorCreate, success } = teamCreate;

    const [name, setName] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [openModalTask, setOpenModalTask] = useState(false)
    const [tasks, setTasks] = useState<[]>();
    const [teamImage, setTeamImage] = useState("");
    const [teamId, setTeamId] = useState();

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [description, setDescription] = useState("");
    const [state, setState] = useState("");

    const dispatch = useDispatch();

    const createTeam = () => {
        dispatch(teamActions.create({ name }) as any);
        setOpenModal(false);
    }

    const createTask = () => {
        dispatch(taskActions.create({ id: teamId, title, priority, description, state }) as any);
        setOpenModalTask(false);
    }

    const listTasks = (tasks: any, id: any) => {
        dispatch(teamActions.list() as any);
        setTasks(tasks);
        setTeamId(id);
    }


    const onDragEnd = () => {
        console.log("DRAG")
    }

    const uploadHandler = async (e: any, imageField = "image") => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();
        console.log(bodyFormData)

        bodyFormData.append('file', file);

        for (var key of bodyFormData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        try {
            dispatch({ type: "UPLOAD_REQUEST" });

            const { data } = await axios.post("http://localhost:4500/upload-image", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch({ type: "UPLOAD_SUCCESS" });
            setTeamImage(data.secure_url);
        } catch (err) {
            console.log(err)
        }
    }

    console.log(teamImage)

    useEffect(() => {
        dispatch(teamActions.list() as any);

        if (success) {
            setOpenModal(false);
        }
    }, [success])


    return (
        <>
            <>
                <div className='navigation-task'>
                    <h2 className="screen-title">Your team</h2>
                    <p className="screen-copy">Teams you've been added to</p>

                    <button className="task-team-create-button" onClick={() => setOpenModal(true)} ><span><i className='bx bx-plus'></i></span> <p>Join or create a team</p></button>

                    {loading ? <LoadingBox /> : (

                        <div className="teams-task-list">
                            {teams.map(({ _id, name, members, tasks }: any) => (
                                <div className="team-task-item" key={_id} onClick={() => listTasks(tasks, _id)}>
                                    <i className='bx bx-code-alt' ></i>
                                    <div>
                                        <h3>{name}</h3>
                                        <p>{members.length} members</p>
                                    </div>
                                </div>
                            ))}

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
                                <input type="text" placeholder="Title" name="" id="" onChange={(e) => setTitle(e.target.value)} />
                                <input type="file" name="file" id="file" onChange={(e) => uploadHandler(e, "featuredImage")} />
                            </div>
                            <button className="btn-success" onClick={createTeam}>Crear</button>
                        </div>
                    </div>
                )}

            </>
            <div className="screen">
                <div className="screen-header">
                    <div>

                        <h2 className="screen-title">Tasks</h2>
                        <p className="screen-copy">Team tasks for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModalTask(true)}><span><i className='bx bx-plus'></i></span> <p>Create an task</p></button>

                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="list-container">
                        <List id="list1" title="Ideas">
                            {tasks?.filter(({ state }: TasksProps) => state === 0)
                                .map(({ _id, index, code, priority, title, description, state }: TasksProps) => (
                                    <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} />
                                ))}
                        </List>
                        <List id="list2" title="To Do">
                        {tasks?.filter(({ state }: TasksProps) => state === 1)
                                .map(({ _id, index, code, priority, title, description, state }: TasksProps) => (
                                    <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} />
                                ))}
                        </List>
                        <List id="list3" title="In Process">
                            {/* <TaskCard id="ycabtrrd-3" index={33} /> */}
                        </List>
                        <List id="list4" title="Sprint">
                            {/* <TaskCard id="muicard-4" index={764} /> */}
                        </List>
                        <List id="list5" title="Review">
                            {/* <TaskCard id="ucangrd-5" index={534} /> */}
                        </List>
                        <List id="list6" title="Finised">
                            {/* <TaskCard id="fdvcagrd-6" index={396} /> */}
                        </List>
                    </div>
                </DragDropContext>

            </div>

            {openModalTask && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Team</h2>
                            <button onClick={() => setOpenModalTask(false)} ><i className='bx bx-x' ></i></button>
                        </div>
                        <div className="modal-inputs">
                            <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
                                <option value="Delayed">Delayed</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Express">Express</option>
                            </select>
                            <input type="text" placeholder="Title" name="" id="" onChange={(e) => setTitle(e.target.value)} />
                            <textarea name="" id="" cols={30} rows={10} placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                            <select name="" id="" onChange={(e) => setState(e.target.value)}>
                                <option value={0}>Idea</option>
                                <option value={1}>To Do</option>
                                <option value={2}>In Process</option>
                                <option value={3}>Sprint</option>
                                <option value={3}>Review</option>
                                <option value={3}>Finished</option>
                            </select>
                        </div>
                        <button className="btn-success" onClick={createTask}>Crear</button>
                    </div>
                </div>
            )}


        </>
    )
}

export default TaskScreen;