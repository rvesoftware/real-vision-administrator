import { Draggable } from "react-beautiful-dnd";
import { TasksProps } from "../../types/TasksProps";


const TaskCard = ({_id, index, code, title, description, state, priority } : TasksProps) => {
    return (
        <Draggable draggableId={_id.toString()} index={index}>
            {(provided) => (
                <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <div className="card-task" >
                        <div className="card-task-title">
                            <span>#{code}</span>
                            <span>1 minute ago</span>
                        </div>
                        <div className="card-task-content">

                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                        <div className="card-task-footer">
                            <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div>
                            <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div>
                            <div className="user-content">
                            <img src="/ceo.png" alt="" title="Nestor Mosquera" />
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </Draggable>

    )
}

export default TaskCard;