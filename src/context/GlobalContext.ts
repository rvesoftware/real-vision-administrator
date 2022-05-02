import React from "react";

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index: any) => {},
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index: any) => {},
    daySelected: null,
    setDaySelected: (day: any) => {}

});

export default GlobalContext;