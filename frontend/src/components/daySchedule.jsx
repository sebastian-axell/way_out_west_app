import { Link } from "react-router-dom";
import ScheduleCard from "./scheduleCard";

function DaySchedule({
    setActiveDay,
    daydata,
    day,
    activeDay
}) {
    function getClassNames(day, activeDay) {
        const classes = [
            day === "saturday" && activeDay !== "saturday" && activeDay !== "all" ? "rounded-b-lg" : "",
            day === "thursday" ? "rounded-t-lg" : "",
            activeDay !== "all" && day !== activeDay && day !== "saturday" ? "border-b-0" : ""
        ].filter(Boolean).join(" ");

        return classes;
    }
    return (
        <div className="">
            <div className="w-full">
                <button value={day} className={`w-full border-2 border-black font-bold text-xl bg-teal-300 bg-opacity-50 p-2 ${getClassNames(day, activeDay)}`}
                    onClick={(e) => setActiveDay(e.target.value)}>{day}</button>
            </div>
            {
                Object.keys(daydata).map((elem) => (
                    <div key={elem} className={`overflow-y-auto bg-[#FFEBC6] ${elem == activeDay || activeDay == "all"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols- md:gap-x-1 max-h-[52vh] 3xl:max-h-[70vh] expand-animation"
                        :
                        "max-h-0"
                        }
                    `}>
                        {
                            daydata[elem].length > 0 ?
                                daydata[elem].map((item) => (
                                    item['day'] == day &&
                                    <div className="flex flex-col xl:flex-row p-3">
                                        <div className="xl:w-7/12 w-full border-2 xl:border-r-0 border-black border-b-0 xl:border-b-2 relative">
                                            <img src={item['img']} className="" alt="" />
                                            <a
                                                href={item['link']}
                                                id="title"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                                                <p class="max-w-[9rem] absolute bottom-0 md:max-w-md lg:max-w-full mx-auto p-1 lg:p-2 bg-[#F194B4] border-2 border-b-0 border-black rounded-t-lg truncate text-xs lg:text-base xl:text-lg">{item['artist']}</p>
                                            </a>
                                        </div>
                                        <div className="w-full xl:w-5/12 h-full">
                                            <ScheduleCard
                                                item={item}
                                                key={item['link']}
                                            />
                                        </div>
                                    </div>
                                ))
                                :
                                (activeDay === day || activeDay == "all") && elem == day &&
                                <div className="col-span-full p-6 w-full flex-col gap-y-4 flex justify-center">
                                    <p className="text-center font-semibold">no interest yet</p>
                                    <Link className="border-2 border-black p-1 px-3 mx-auto bg-teal-500 font-semibold text-white rounded-lg" to={"/"}>add some</Link>
                                </div>
                        }
                    </div>
                ))
            }
        </div >
    )
}
export default DaySchedule;