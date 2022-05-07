import dayjs from "dayjs";
import { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";

const ContextWrapper = (props: any) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
    const [daySelected, setDaySelected] = useState<any>();

    useEffect(() => {
        if (smallCalendarMonth !== 0) {
            setMonthIndex(smallCalendarMonth);
        }
    }, [smallCalendarMonth])

    return (
        <GlobalContext.Provider value={{ monthIndex, setMonthIndex, smallCalendarMonth, setSmallCalendarMonth, daySelected, setDaySelected }}>
            {props.children}
        </GlobalContext.Provider>
    )
}


export default ContextWrapper;