import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import { useDispatch } from "react-redux";
import eventActions from "../actions/eventActions";
import constants from "../constants/constantsTemplate";
import { getMonth } from "../utils/calendar";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";


const locales = {
    "en-US": enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"]

const CalendarScreen = () => {

    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const getCurrentDayClass = (day: any) => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "current-day" : "";
    }

    const { monthIndex, setMonthIndex, daySelected, setSmallCalendarMonth, setDaySelected } = useContext(GlobalContext);

    const handlePrevMonth = () => {
        setMonthIndex(monthIndex - 1);
    }

    const handleNextMonth = () => {
        setMonthIndex(monthIndex + 1);
    }

    const handleReset = () => {
        setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
    }

    const eventList = useSelector((state: any) => state.eventList);
    const { loading, error, data: events } = eventList;

    const eventCreate = useSelector((state: any) => state.eventCreate);
    const { loading: loadingCreate, error: errorCreate, success } = eventCreate;

    const [newEvent, setNewEvent] = useState<any>({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState<any[]>(events);

    const [openModal, setOpenModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>();
    const [title, setTitle] = useState(selectedEvent? selectedEvent.title : "");
    const [description, setDescription] = useState(selectedEvent? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent? selectedEvent.label : labelsClasses[0]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const dispatch = useDispatch();


    const createHandler = () => {
        dispatch(eventActions.create({ title, description, day: daySelected?.valueOf(), label: selectedLabel }) as any)
    }

    // SMALL CALENDAR

    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonthSmall, setCurrentMonthSmall] = useState(getMonth());

    const handlePrevMonthSmall = () => {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }

    const handleNextMonthSmall = () => {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }

    const getCurrentDayClassSmall = (day: any) => {
        const format = 'DD-MM-YY';
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "current-day"
        } else if (currDay === slcDay) {
            return "current-day-small"
        } else {
            return ""
        }
    }


    const getDay = () => {
        const format = "DD-MM-YY";
        // const slcDay = daySelected && daySelected.format(format);
    }
    useEffect(() => {
        const eventConstants = new constants('EVENT');
        if (success) {
            dispatch({ type: eventConstants.constants().CREATE_RESET });
            setOpenModal(false);
        }

        dispatch(eventActions.list() as any);
        setCurrentMonth(getMonth(monthIndex));
        // setCurrentMonthIdx(monthIndex)
        setCurrentMonthSmall(getMonth(currentMonthIdx))

        // const evnts = events.filter((evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")) 
    }, [dispatch, success, monthIndex, currentMonthIdx])



    return (
        <>

            {/* <div className="page">
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
)} */}

            {openModal && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Team</h2>
                            <button onClick={() => setOpenModal(false)} ><i className='bx bx-x' ></i></button>
                        </div>
                        <div className="modal-inputs">
                            <input type="text" placeholder="Name" name="" id="" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <p><i className='bx bx-time-five'></i> {daySelected?.format("dddd, MMMM DD")}</p>
                            <input type="text" placeholder="Add a description" name="" id="" onChange={(e) => setDescription(e.target.value)} />
                            <div className="labels">
                                <i className='bx bx-bookmark-alt'></i>
                                {
                                    labelsClasses.map((lblClass, i) => (
                                        <span key={i} className={`lbl bg-${lblClass}`} onClick={() => setSelectedLabel(lblClass)} >
                                            {selectedLabel === lblClass && (
                                                <i className='bx bx-check' ></i>
                                            )}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <button className="btn-success" onClick={createHandler}>Create</button>
                    </div>
                </div>
            )}

            <div className="calendar">


                <div className="calendar-header">

                </div>

                <div className='navigation-calendar'>
                    <h2 className="screen-title">Your Calendar</h2>
                    <p className="screen-copy">Calendar vvents for the current period</p>

                    <button className="calendar-today-btn" onClick={handleReset} >Today</button>

                    <div className="calendar-data">

                        <button onClick={handlePrevMonth} ><i className='bx bx-chevron-left'></i></button>
                        <button onClick={handleNextMonth} ><i className='bx bx-chevron-right'></i></button>

                        <h3>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h3>
                    </div>

                    <button className="task-team-create-button" onClick={() => setOpenModal(true)} ><span><i className='bx bx-plus'></i></span> <p>Create a event</p></button>


                    <div className="small-calendar">
                        <div className="small-calendar-header">
                            <p>{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}</p>

                            <div className="calendar-data">

                                <button onClick={handlePrevMonthSmall} ><i className='bx bx-chevron-left'></i></button>
                                <button onClick={handleNextMonthSmall} ><i className='bx bx-chevron-right'></i></button>

                            </div>
                        </div>

                        <div className="small-calendar-data">
                            <div className="small-calendar-data-header">
                                {currentMonthSmall[0].map((day: any, i: number) => (
                                    <span key={i}>{day.format('dd').charAt(0)}</span>
                                ))}
                            </div>
                            <div className="small-data">

                                {currentMonthSmall.map((row: any, i: number) => (
                                    <React.Fragment key={i}>
                                        {row.map((day: any, idx: number) => (
                                            <button onClick={() => { setSmallCalendarMonth(currentMonthIdx); setDaySelected(day) }} className={`${getCurrentDayClassSmall(day)}`} key={idx}>
                                                <span>{day.format('D')}</span>
                                            </button>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="screen-calendar grid-calendar">
                    {currentMonth.map((row: any, i: number) => (
                        <React.Fragment key={i}>
                            {row.map((day: any, index: number) => (
                                <div className="day" key={index} onClick={() => { setDaySelected(day); setOpenModal(true) }}>
                                    {i === 0 && (
                                        <p>{day.format("dddd")}</p>
                                    )}
                                    <div>

                                    <p className={`${getCurrentDayClass(day)}`}>  {day.format("DD")}</p>
                                    {!loading && events.filter((evt: any) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"))
                                        .map((evt: any, idx: any) => (
                                            <div key={idx} className={`event bg-${evt.label}`} onClick={() => setSelectedEvent(evt)}>
                                                {evt.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

        </>
    )
}

export default CalendarScreen; 