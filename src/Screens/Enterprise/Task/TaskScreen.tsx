import List from "../../../components/Task/List";
import Navigation from "../../../components/Task/Navigation";
import '../../../styles/task.css'

const TaskScreen = () => {
    return (
        <>
            <Navigation />
            <div className="screen">
            <h2 className="screen-title">Tasks</h2>
            <p className="screen-copy">Team tasks for the current period</p>
            
            <div className="list-container">
                <List title="Ideas" />
                <List  title="To Do" />
                <List title="In Process" />
                <List title="Sprint" />
                <List title="Review" />
                <List title="Finised" />
            </div>
            </div>
        </>
    )
}

export default TaskScreen;