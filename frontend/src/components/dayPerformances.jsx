import ScheduleCard from "./scheduleCard";
import PerformanceDetails from "./performanceDetails";

export default function ({
    timeSlots
}) {
    return (
        <div className="md:gap-x-1 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-2">
            {
                Object.entries(timeSlots).map(entry => {
                    const [timeslot, performances] = entry;
                    return (
                        <div className="">
                            <div className="flex justify-center font-bold text-base timeslot">
                                {timeslot + ":00"}
                            </div>
                            <div className="">
                                {
                                    performances.map((elem) => (
                                        <div className="flex flex-col xl:flex-row p-3 relative">
                                            <div className="xl:w-7/12 w-full border-2 xl:border-r-0 border-black border-b-0 xl:border-b-2 relative">
                                                <img src={elem['img']} className="aspect-square" alt="" />
                                                <div className="absolute top-0 flex justify-around w-full pt-3 bg-pink-50 bg-opacity-50 xl:hidden">
                                                    <PerformanceDetails stage={elem['stage']} time={elem['time']} />
                                                </div>
                                                <a
                                                    href={elem['link']}
                                                    id="title"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                                                    <p class="max-w-[8rem] absolute bottom-0 md:max-w-[5rem] lg:max-w-full mx-auto p-1 lg:p-2 bg-[#F194B4]
                                                    border-2 border-b-0 border-black rounded-t-lg truncate text-xs lg:text-base xl:text-lg">{elem['artist']}</p>
                                                </a>
                                            </div>
                                            <div className="w-full xl:w-5/12">
                                                <ScheduleCard
                                                    elem={elem}
                                                    key={elem['link']}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}