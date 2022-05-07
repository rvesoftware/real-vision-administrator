import dayjs from "dayjs";
import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index: any) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index: any) => {},
    daySelected: dayjs(),
    setDaySelected: (day: any) => {}

});

export default GlobalContext;