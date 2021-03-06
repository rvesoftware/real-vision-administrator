import List from "../../../components/Task/List";
import TaskCard from "../../../components/Task/TaskCard";
import '../../../styles/task.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import teamActions from "../../../actions/teamActions";
import { TasksProps } from "../../../types/TasksProps";
import taskActions from "../../../actions/taskActions";
import constants from "../../../constants/constantsTemplate";
import adminActions from "../../../actions/adminActions";


const TaskScreen = () => {

    const uploadImage = useSelector((state: any) => state.uploadImage)
    const { loading: loadingUpload } = uploadImage;

    const teamList = useSelector((state: any) => state.teamList);
    const { loading, error, data: teams } = teamList;

    const adminList = useSelector((state: any) => state.adminList);
    const { loading: loadingAdmin, error: errorAdmin, data: admins } = adminList;

    const teamCreate = useSelector((state: any) => state.teamCreate);
    const { loading: loadingCreate, error: errorCreate, success } = teamCreate;

    const taskCreate = useSelector((state: any) => state.taskCreate);
    const { loading: loadingTask, error: errorTask, success: successTask } = taskCreate;

    const taskListMany = useSelector((state: any) => state.taskListMany);
    const { loading: loadingListTask, error: errorListTask, data: tasks } = taskListMany;


    const [name, setName] = useState('');
    const [openModal, setOpenModal] = useState(false)
    const [openModalTask, setOpenModalTask] = useState(false)
    const [teamImage, setTeamImage] = useState("");
    const [teamId, setTeamId] = useState<string>("");

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Delayed");
    const [description, setDescription] = useState("");
    const [state, setState] = useState(0);
    const [users, setUsers] = useState<any>([]);


    const dispatch = useDispatch();

    const createTeam = (e: any) => {
        e.preventDefault();
        dispatch(teamActions.create({ name, image: teamImage }) as any);
        setOpenModal(false);
    }

    const createTask = (e: any) => {
        e.preventDefault();
        dispatch(taskActions.create({ team: teamId, title, priority, description, state, owners: users }) as any);
        setOpenModalTask(false);
        // dispatch(teamActions.list() as any);
        // dispatch(teamActions.list() as any);
    }

    const listTasks = (tasks: any, id: any) => {
        dispatch(taskActions.listMany(id) as any);
        setTeamId(id);
    }


    const onDragEnd = () => {
        console.log("DRAG")
    }

    const uploadHandler = async (e: any, imageField = "image") => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();

        bodyFormData.append('file', file);

        try {
            dispatch({ type: "UPLOAD_REQUEST" });

            const { data } = await axios.post("https://real-vision-api.herokuapp.com/upload-image", bodyFormData, {
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

    const newTask = (taskConst: any) => {
        console.log("Create")
        dispatch({ type: taskConst.constants().CREATE_RESET });
        dispatch(teamActions.list() as any);
        if (!loading) {
            console.log("ENTROOOO")
            const t = teams.filter((te: any) => te._id == teamId);
            listTasks(t[0].tasks, t[0]._id);
            console.log(t[0]._id)
        }
    }

    const addAdmin = (data: any) => {
        const index = users.findIndex((u: any) => u.name == data.name);
        console.log(data)
        console.log(index)
        if (index >= 0) {
            users.splice(index, 1);
            setUsers([...users]);
        } else {
            setUsers([...users, { name: data.name, image: data.image }]);
        }

        console.log(users)
    }

    console.log(users)
    useEffect(() => {
        const teamConstants = new constants('TEAM');
        const taskConstants = new constants('TASK');

        if (success) {
            dispatch({ type: teamConstants.constants().CREATE_RESET });
            setOpenModal(false);
        }

        if (successTask) {
            dispatch({ type: taskConstants.constants().CREATE_RESET });
            setUsers([])
            newTask(taskConstants)
        }

        dispatch(taskActions.listMany(teamId) as any)
        dispatch(teamActions.list() as any);
        dispatch(adminActions.list() as any);
    }, [dispatch, success, successTask])


    console.log(tasks)
    return (
        <>
            <>
                <div className='navigation-task'>
                    <h2 className="screen-title">Your team</h2>
                    <p className="screen-copy">Teams you've been added to</p>

                    <button className="task-team-create-button" onClick={() => setOpenModal(true)} ><span><i className='bx bx-plus'></i></span> <p>Join or create a team</p></button>

                    {loading ? <LoadingBox /> : (

                        <div className="teams-task-list">
                            {teams.map(({ _id, name, image, members, tasks }: any) => (
                                <div className="team-task-item" key={_id} onClick={() => listTasks(tasks, _id)}>
                                    {/* <i className='bx bx-code-alt' ></i> */}
                                    <img src={image} alt="" />
                                    <div>
                                        <h3 className="team-title">{name}</h3>
                                        {/* <p>{members.length} members</p> */}
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
                                <input type="text" placeholder="Name" name="" id="" onChange={(e) => setName(e.target.value)} />
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

                {!loadingListTask && (


                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="list-container">
                            <List id="list1" title="Ideas">
                                {tasks?.filter(({ state }: TasksProps) => state === 0)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                            <List id="list2" title="To Do">
                                {tasks?.filter(({ state }: TasksProps) => state === 1)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                            <List id="list3" title="In Process">
                                {tasks?.filter(({ state }: TasksProps) => state === 2)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                            <List id="list4" title="Sprint">
                                {tasks?.filter(({ state }: TasksProps) => state === 3)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                            <List id="list5" title="Review">
                                {tasks?.filter(({ state }: TasksProps) => state === 4)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                            <List id="list6" title="Finished">
                                {tasks?.filter(({ state }: TasksProps) => state === 5)
                                    .map(({ _id, index, code, priority, title, description, state, owners, createdAt }: TasksProps) => (
                                        <TaskCard key={_id} _id={_id} index={index} code={code} priority={priority} title={title} description={description} state={state} owners={owners} createdAt={createdAt} />
                                    ))}
                            </List>
                        </div>
                    </DragDropContext>

                )}


            </div>

            {openModalTask && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Task</h2>
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
                            <select name="" id="" onChange={(e: any) => setState(e.target.value)}>
                                <option value={0}>Idea</option>
                                <option value={1}>To Do</option>
                                <option value={2}>In Process</option>
                                <option value={3}>Sprint</option>
                                <option value={3}>Review</option>
                                <option value={3}>Finished</option>
                            </select>
                            <div className="labels-tasks">
                                {!loadingAdmin && (
                                    <>
                                        {admins.map((admin: any) => (
                                            <label key={admin._id} htmlFor={admin.name} title={admin.name}>
                                                <div className="picture">
                                                    {admin.image ? (
                                                        <img src={admin.image} alt={admin.name} />
                                                    ) : (
                                                        <div className='admin-letter'>
                                                            {admin.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <input type="checkbox" onChange={() => addAdmin({ name: admin.name, image: admin.image })} />

                                            </label>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="btn-success" onClick={createTask}>Crear</button>
                    </div>
                </div>
            )}


        </>
    )
}

export default TaskScreen;