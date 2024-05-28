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
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-x-1 max-h-[490px] lg:max-h-[310px] expand-animation"
                        :
                        "max-h-0"
                        }
                    `}>
                        {
                            daydata[elem].map((item) => (
                                item['day'] == day &&
                                <ScheduleCard
                                    item={item}
                                    key={item['artist']}
                                    updateData={updateData}
                                    updateKeenComplete={updateKeenComplete}
                                    inProgress={inProgress}
                                    updateFailed={updateFailed}
                                    timedOut={timeoutError}
                                />
                            ))
                        }
                    </div>
                ))
            }
        </div >
    )
}
export default DaySchedule;