import ScheduleCard from "./scheduleCard";

function DaySchedule({
    setActiveDay,
    daydata,
    day,
    activeDay,
    updateData,
    updateKeenComplete,
    inProgress,
    updateFailed,
    timeoutError,
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
                <button value={day} className={`w-full border-2 border-black font-bold text-xl bg-[#F194B4] p-2 ${getClassNames(day, activeDay)}`}
                    onClick={(e) => setActiveDay(e.target.value)}>{day}</button>
            </div>
            {
                Object.keys(daydata).map((elem) => (
                    <div key={elem} className={`overflow-y-scroll bg-[#FFEBC6] ${elem == activeDay || activeDay == "all"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols- md:gap-x-1 max-h-[400px] sm:max-h-[470px] lg:max-h-[600px] expand-animation"
                        :
                        "max-h-0"
                        }
                    `}>
                        {
                            daydata[elem].map((item) => (
                                item['day'] == day &&
                                <div className="flex flex-col xl:flex-row p-3">
                                    <div className="xl:w-7/12 w-full border-2 border-r-0 border-black  md:block relative">
                                        <img src={item['img']} className="" alt="" />
                                        <a
                                            href={item['link']}
                                            id="title"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                                            <p class="max-w-sm absolute bottom-0 md:max-w-md lg:max-w-full mx-auto p-1 md:p-2 bg-[#F194B4] border-2 border-b-0 border-black rounded-t-lg truncate text-xs md:text-lg">{item['artist']}</p>
                                        </a>
                                    </div>
                                    <div className="w-full xl:w-5/12 h-full">
                                        <ScheduleCard
                                            item={item}
                                            key={item['artist']}
                                            updateData={updateData}
                                            updateKeenComplete={updateKeenComplete}
                                            inProgress={inProgress}
                                            updateFailed={updateFailed}
                                            timedOut={timeoutError}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div >
    )
}
export default DaySchedule;