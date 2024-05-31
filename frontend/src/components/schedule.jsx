import { useState } from "react";
import { useEffect } from "react";
import DaySchedule from "./daySchedule";
import svgIcons from "./svgIcon";
function Schedule({
    data,
    updateData,
    isUpdateComplete,
    inProgress,
    updateFailed,
    timeoutError,
}) {
    const days = ["thursday", "friday", "saturday"]
    const [tableActive, setTableActive] = useState(false)
    const [activeDay, setActiveDay] = useState("thursday")
    const [dayData, setDayData] = useState({
        thursday: [],
        friday: [],
        saturday: [],
    });
    const emojiMapping = {
        "wittle bit": '🤏',
        deffo: '🤝',
        hella: '👌',
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
            <div className="flex flex-col h-full justify-start items-center w-11/12 xl:w-11/12 3xl:w-10/12 mx-auto mx-auto">
                <button onClick={() => { setActiveDay("all"); }} className="text-xl p-3 rounded-lg rounded-b-none border-2 border-b-0 font-bold border-black bg-pink-50">expand all</button>
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
            {
                tableActive &&
                <div className="z-10 h-screen w-screen bg-opacity-50 bg-pink-200 flex fixed justify-center items-center top-0 left-0 right-0 font-semibold">
                    <div className="px-3 md:px-5 py-5 bg-[#FFEBC6] shadow rounded-lg border-2 border-black h-fit w-10/12 lg:w-fit overflow-y-auto">
                        <div className='flex justify-end'>
                            <button className='sm:-mr-0 lg:-mr-2 sm:-mt-4 -mt-3 -mr-1 relative' onClick={() => setTableActive(false)}>
                                {svgIcons.cross}
                            </button>
                        </div>
                        <div className="text-center">
                            <h1 className="text-xl lg:text-3xl font-bold tracking-tight">this page shows who we're keen to see each day</h1>
                            <h3 className="text-base lg:text-xl font-semibold tracking-tight mt-2 underline">here's how the emojis work</h3>

                            <div className="flex lg:flex-row flex-col">
                                {Object.entries(emojiMapping).map(([value, emoji]) => (
                                    <div key={value} className="flex justify-start gap-x-2 w-8/12 p-4 mx-auto">
                                        <p className="p-1 lg:text-xl w-fit rounded-full border-2 border-black bg-teal-500 my-auto">{emoji}</p>
                                        <p className="flex p-1 my-auto">means bro is {value} keen</p>
                                    </div>
                                ))}
                            </div>
                            <button className="p-3" onClick={()=>setTableActive(false)}>got it</button>
                        </div>
                    </div>
                </div>
            }
            <div className="fixed bottom-5 md:right-10 right-0 sm:right-5 lg:right-[12%] p-5">
                <button onClick={() => (setTableActive(true))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
            </div>
        </div >
    )
}
export default Schedule;