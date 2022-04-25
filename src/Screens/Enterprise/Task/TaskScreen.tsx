import List from "../../../components/Task/List";
import Navigation from "../../../components/Task/Navigation";
import TaskCard from "../../../components/Task/TaskCard";
import '../../../styles/task.css'
import { DragDropContext } from 'react-beautiful-dnd'


const TaskScreen = () => {

    const onDragEnd = () => {
        console.log("DRAG")
    }
    
    return (
        <>
            <Navigation />
            <div className="screen">
                <div className="screen-header">
                    <div>

                    <h2 className="screen-title">Tasks</h2>
                    <p className="screen-copy">Team tasks for the current period</p>
                    </div>

                    <button className="btn"><span><i className='bx bx-plus'></i></span> <p>Create an task</p></button>

                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="list-container">
                        <List id="list1" title="Ideas">
                            <TaskCard id="vrvcard-1" index={143} />
                            <TaskCard id="iugrvcard-8" index={743} />
                        </List>
                        <List id="list2" title="To Do">
                            <TaskCard id="cavrvrd-2" index={342} />
                        </List>
                        <List id="list3" title="In Process">
                            <TaskCard id="ycabtrrd-3" index={33} />
                        </List>
                        <List id="list4" title="Sprint">
                            <TaskCard id="muicard-4" index={764} />
                        </List>
                        <List id="list5" title="Review">
                            <TaskCard id="ucangrd-5" index={534} />
                        </List>
                        <List id="list6" title="Finised">
                            <TaskCard id="fdvcagrd-6" index={396} />
                        </List>
                    </div>
                </DragDropContext>

            </div>
        </>
    )
}

export default TaskScreen;