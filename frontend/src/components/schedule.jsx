import { useState, useContext, useEffect } from "react";
import DaySchedule from "./daySchedule";
import svgIcons from "./svgIcon";
import InfoTableEmoji from "./infoTableEmoji";
import { DataContext } from "./dataContext";


function Schedule({}) {
    const [data] = useContext(DataContext);
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

    return (
        <div className="mt-24 mb-5">
            <div className="flex flex-col h-full justify-start items-center w-11/12 xl:w-11/12 3xl:w-10/12 mx-auto mx-auto min-w-[75vw] 2xl:min-w-[42vw]">
                <button onClick={() => { setActiveDay("all"); }} className="text-xl p-3 rounded-lg rounded-b-none border-2 border-b-0 font-bold border-black bg-pink-50">expand all</button>
                <div className="w-9/12 xl:w-10/12 3xl:w-10/12 mx-auto">
                    {
                        days.map((day) => (
                            <DaySchedule
                                setActiveDay={setActiveDay}
                                activeDay={activeDay}
                                day={day}
                                daydata={dayData}
                                key={day}
                            />
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