import { useState, useEffect } from "react";
import DaySchedule from "./daySchedule";
import svgIcons from "./svgIcon";
import InfoTableEmoji from "./infoTableEmoji";


function Schedule({
    data
}) {
    const days = ["thursday", "friday", "saturday"]
    const [tableActive, setTableActive] = useState(false)
    const [activeDay, setActiveDay] = useState("thursday")
    const [dayData, setDayData] = useState({
        thursday: [],
        friday: [],
        saturday: [],
    });
    useEffect(() => {
        const newFilteredData = {};
        days.forEach(day => {
            newFilteredData[day] = Object.values(data[day]).filter(
                entry => entry['keen'] !== ""
            );
        });
        setDayData(newFilteredData)
    }, [data])
    function getClassNames(day, activeDay) {
        const classes = [
            day === "saturday" && activeDay !== "saturday" && activeDay !== "all" ? "rounded-b-lg" : "",
            day === "thursday" ? "rounded-t-lg" : "",
            activeDay !== "all" && day !== activeDay && day !== "saturday" ? "border-b-0" : ""
        ].filter(Boolean).join(" ");

        return classes;
    }

    return (
        <div className="mt-24 mb-5 flex justify-center">
            <div className="flex flex-col h-full justify-start items-center w-[240px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
                <button onClick={() => { setActiveDay("all"); }}
                    className="text-xl p-3 rounded-lg rounded-b-none border-2 border-b-0 font-bold border-black bg-pink-50">expand all</button>
                <div className="w-9/12 xl:w-10/12 3xl:w-10/12 mx-auto">
                    {
                        days.map((day) => (
                            <div className="">
                                <button value={day} className={`w-full border-2 border-black font-bold text-xl bg-teal-300 bg-opacity-50 p-2 ${getClassNames(day, activeDay)}`}
                                    onClick={(e) => setActiveDay(e.target.value)}>{day}</button>
                                <DaySchedule
                                    activeDay={activeDay}
                                    day={day}
                                    daydata={dayData[day]}
                                    key={day}
                                />
                            </div>
                        ))
                    }
                </div>
            </div >
            {
                tableActive && <InfoTableEmoji setTableActive={setTableActive} />
            }
            <div className="fixed bottom-5 md:right-10 right-0 sm:right-5 lg:right-[12%] p-5">
                <button className=" bg-teal-500 rounded-full text-white" onClick={() => (setTableActive(true))}>
                    {svgIcons.info}
                </button>
            </div>
        </div >
    )
}
export default Schedule;