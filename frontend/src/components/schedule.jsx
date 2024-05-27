import { useState } from "react";
import { useEffect } from "react";
import DaySchedule from "./daySchedule";
function Schedule({
    data,
    updateData,
    isUpdateComplete,
    inProgress,
    updateFailed,
    timeoutError,
}) {
    const days = ["thursday", "friday", "saturday"]
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
        <div className="mt-20 lg:mt-24 mb-2 md:mb-5 ">
            <h2 className="text-5xl text-center p-3">here's the plan</h2>
            <div className="flex flex-col h-full justify-start items-center w-11/12 xl:w-11/12 3xl:w-7/12 mx-auto mx-auto">
                <button onClick={() => { setActiveDay("all"); }} className="text-xl p-3 rounded-lg rounded-b-none border-2 border-b-0 border-black bg-white">expand all</button>
                <div className="mb-9 pb-12 w-9/12 xl:w-10/12 3xl:w-10/12 mx-auto">
                    {
                        days.map((day) => (
                            <DaySchedule setActiveDay={setActiveDay} activeDay={activeDay} day={day} daydata={dayData}
                                updateData={updateData}
                                updateKeenComplete={isUpdateComplete}
                                inProgress={inProgress}
                                updateFailed={updateFailed}
                                timedOut={timeoutError}
                                key={day}
                            />
                        ))
                    }
                </div>
            </div >
        </div >
    )
}
export default Schedule;