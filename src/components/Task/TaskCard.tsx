import { Draggable } from "react-beautiful-dnd";

interface CardProps {
    id: string;
    index: number;
}

const TaskCard = ({id, index} : CardProps) => {
    return (
        <Draggable draggableId={id.toString()} index={index}>
            {(provided) => (
                <div  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    <div className="card-task" >
                        <div className="card-task-title">
                            <span>#1895</span>
                            <span>1 minute ago</span>
                        </div>
                        <div className="card-task-content">

                            <h2>Design dog website for client</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore ipsam iusto exercitationem corporis ratione tempore est mollitia unde hic eos sed obcaecati ab similique blanditiis </p>
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