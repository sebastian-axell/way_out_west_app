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
    const emojiMapping = {
        hella: '😍',
        cool: '😎',
        happy: '😊'
    };
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
        <div className="mt-24 mb2 md:mb-5 ">
            <div className="flex flex-col h-full justify-start items-center w-11/12 xl:w-11/12 3xl:w-7/12 mx-auto mx-auto">
                {/* <table>
                    <tbody>
                        {Object.entries(emojiMapping).map(([value, emoji]) => (
                            <tr key={value}>
                                <td>{emoji}</td>
                                <td>means bro is {value} keen</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <button onClick={() => { setActiveDay("all"); }} className="text-xl px-2 py-1 rounded-lg rounded-b-none border-2 border-b-0 border-black bg-cyan-600 text-white">expand all</button>
                <div className="w-9/12 xl:w-10/12 3xl:w-10/12 mx-auto">
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