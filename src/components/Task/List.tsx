interface ListTaskProps {
    title: string;
}

const List = ({title}: ListTaskProps) => {
    return (
        <div className="list-card">
            <h2 className="list-title">{title}</h2>
        </div>
    )
}

export default List;