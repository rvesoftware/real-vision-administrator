import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { useDispatch } from "react-redux";
import eventActions from "../actions/eventActions";
import constants from "../constants/constantsTemplate";


const locales = {
    "en-US": enUS,
};

// const events = [
//     {
//         title: "Big Meeting",
//         allDay: true,
//         start: new Date(2022,4,0),
//         end: new Date(2022,4,0),
//     },
//     {
//         title: "Video Informativo",
//         start: new Date(2022,4,6),
//         end: new Date(2022,4,6),
//     },
//     {
//         title: "Video Informativo",
//         start: new Date(2022,4,13),
//         end: new Date(2022,4,13),
//     },    {
//         title: "Video Informativo",
//         start: new Date(2022,4,20),
//         end: new Date(2022,4,20),
//     },
//     {
//         title: "Confenrece",
//         start: new Date(2022,4,0),
//         end: new Date(2022,4,0),
//     },
//     {
//         title: "Video Informtivo",
//         start: new Date(2022,8,6),
//         end: new Date(2022,4,0),
//     }
// ]

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const CalendarScreen = () => {

    const eventList = useSelector((state: any) => state.eventList);
    const {loading, error, data: events} = eventList;

    const eventCreate = useSelector((state: any) => state.eventCreate);
    const {loading: loadingCreate, error: errorCreate, success} = eventCreate;

    const [newEvent, setNewEvent] = useState<any>({title:"", start:"", end:""});
    const [allEvents, setAllEvents] = useState<any[]>(events);

    const [openModal, setOpenModal] = useState(false);

    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const dispatch = useDispatch();

    const createHandler = () => {
        dispatch(eventActions.create({title, start, end}) as any)
    }

    useEffect(() => {
        
        const eventConstants = new constants('EVENT');

        if(success){
            dispatch({type: eventConstants.constants().CREATE_RESET});
            setOpenModal(false);
        }

        dispatch(eventActions.list() as any);
    }, [dispatch, success])


    return(
        <>

        <div className="page">
            <div className="page-header">
                <div>

                <h2 className="screen-title">Calendar</h2>
                <p className="screen-copy">Your work calendar</p>
                </div>
                <button className="btn" onClick={() => setOpenModal(true)}>Add an Event</button>
            </div>
            {loading? <LoadingBox /> : (
                <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />                 
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
            <input type="text" placeholder="Name" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="date" placeholder="Date Start" name="" id=""  onChange={(e) => setStart(e.target.value)} />
            <input type="date" placeholder="Date End" name="" id="" onChange={(e) => setEnd(e.target.value)} />
        </div>
        <button className="btn-success" onClick={createHandler}>Create</button>
    </div>
</div>
)}
        </>
    )
}

export default CalendarScreen; 