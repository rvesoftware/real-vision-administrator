import { Droppable } from "react-beautiful-dnd";

interface ListTaskProps {
    id: string;
    title: string;
    children: React.ReactNode
}

const List = ({ id, title, children }: ListTaskProps) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                <div className="list-card" key={id}>
                    <h2 className="list-title">{title}</h2>
                    <div className="list-card-container">
                        {children}
                    </div>
                </div>
                {provided.placeholder}

                </div>

            )}

        </Droppable>
    )
}

export default List;