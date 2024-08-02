import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DayPerformances from "./dayPerformances";

function DaySchedule({
    daydata,
    day,
    activeDay
}) {
    const [timeSlots, setTimeSlots] = useState({});
    useEffect(() => {
        const newSlots = daydata.reduce((acc, item) => {
            const hour = item['time'].slice(0, 2);
            if (!acc[hour]) {
                acc[hour] = [];
            }
            acc[hour].push(item);
            return acc;
        }, {});
        const sortedObj = Object.fromEntries(
            Object.entries(newSlots).sort(([key1], [key2]) => key1.localeCompare(key2)).map(([key, value]) => {
                value.sort((performance1, performance2) => {
                    const minutes1 = parseInt(performance1['time'].split(":")[1], 10);
                    const minutes2 = parseInt(performance2['time'].split(":")[1], 10);
                    return minutes1 - minutes2;
                });
                return [key, value];
            })
        );
        setTimeSlots(sortedObj);
    }, [daydata]);
    return (
        <div
            key={day}
            className={`
                ${day == activeDay || activeDay == "all"
                    ?
                    "bg-[#FFEBC6] max-h-[52vh] 3xl:max-h-[70vh] overflow-y-auto expand-animation"
                    :
                    "hidden"
                }`}>
            {
                daydata.length > 0 ?
                    <DayPerformances timeSlots={timeSlots} />
                    :
                    <div className="p-6 w-full flex-col gap-y-4 flex justify-center">
                        <p className="text-center font-semibold">no interest yet</p>
                        <Link className="border-2 border-black p-1 px-3 mx-auto bg-teal-500 font-semibold text-white rounded-lg" to={"/"}>add some</Link>
                    </div>
            }
        </div >
    )
}
export default DaySchedule;