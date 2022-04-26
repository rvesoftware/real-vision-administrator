import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import { useState } from "react";


const locales = {
    "en-US": enUS,
};

const events = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022,4,0),
        end: new Date(2022,4,0),
    },
    {
        title: "Video Informativo",
        start: new Date(2022,4,6),
        end: new Date(2022,4,6),
    },
    {
        title: "Video Informativo",
        start: new Date(2022,4,13),
        end: new Date(2022,4,13),
    },    {
        title: "Video Informativo",
        start: new Date(2022,4,20),
        end: new Date(2022,4,20),
    },
    {
        title: "Confenrece",
        start: new Date(2022,4,0),
        end: new Date(2022,4,0),
    },
    {
        title: "Video Informtivo",
        start: new Date(2022,8,6),
        end: new Date(2022,4,0),
    }
]

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const CalendarScreen = () => {

    const [newEvent, setNewEvent] = useState<any>({title:"", start:"", end:""});
    const [allEvents, setAllEvents] = useState<any[]>(events);

    const addEventHandler = () => {
        setAllEvents([...allEvents, newEvent])
    }

    return(
        <div className="page">

            <div className="page-header">
                <div>

                <h2>Calendar</h2>
                <p>Your work calendar</p>
                </div>
                <button className="btn">Add an Event</button>
            </div>

            <div>
                <input type="text" placeholder="Add Title" />
            </div>
            <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} /> 
        </div>
    )
}

export default CalendarScreen; 