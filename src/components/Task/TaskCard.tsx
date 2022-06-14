import { Draggable } from "react-beautiful-dnd";
import { TasksProps } from "../../types/TasksProps";
import TimeAgo from "react-timeago";

const TaskCard = ({ _id, index, code, title, description, state, priority, owners, createdAt }: TasksProps) => {
    return (
        <Draggable draggableId={_id.toString()} index={index}>
            {(provided) => (
                <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <div className="card-task" >
                        <div className={`card-task-title ${priority}`}>
                            <span>#{code}</span>
                            <span>{<TimeAgo date={createdAt} />}</span>
                        </div>
                        <div className="card-task-content">

                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                        <div className="card-task-footer">
                            {owners.map((owner: any) => (
                                <div className="user-content">
                                    {owner.image ? (
                                        <img src={owner.image} alt="" title={owner.name} />

                                    ) : (
                                        <div className='admin-letter' title={owner.name}>
                                            {owner.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            ))}

                            
                            {/* <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div>
                            <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div>
                            <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div> */}
                        </div>
                        <div className="card-actions">
                                        <button><i className='bx bx-trash' ></i></button>
                                        <button><i className='bx bxs-left-arrow' ></i></button>
                                        <button><i className='bx bxs-right-arrow'></i></button>

                                    </div>
                    </div>

                </div>
            )}
        </Draggable>

    )
}

export default TaskCard;