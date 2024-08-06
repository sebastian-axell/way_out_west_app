import { useState } from "react";
import Modal from "./modal";
import svgIcons from "./svgIcon";
import PerformanceDetails from "./performanceDetails";
import constants from "../auxiliary/constants";
function ScheduleCard({
    elem
}) {
    const [openModal, setOpenModal] = useState(false);
    const getInterestClass = (interest) => {
        switch (interest) {
            case "hella":
                return "👌"
            case "whyNot":
                return "🤏"
            case "deffo":
                return "🤝"
            default:
                return '';
        }
    };
    return (
        <div className="w-full flex flex-col justify-start border-2 border-black relative bg-[#FFF2E5] h-full">
            <div className="hidden xl:block">
                <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 text-center font-semibold border-b-2 border-black">interested</p>
            </div>
            <div className={`flex font-bold xl:flex-col justify-around xl:justify-start mb-1 lg:mb-4 w-full`}>
                {
                    elem['keen'].split(";").map((interest) => {
                        const [name, level] = interest.split("-");
                        if (constants.names.includes(name)) {
                            return (
                                <div key={name} className={`relative lg:text-lg text-xs p-0.5 xl:p-1 flex flex-col xl:flex-row justify-between text-center items-center`}>
                                    <p className={`p-0.5`}>{name}</p>
                                    <p className="p-0.5 lg:px-1 w-fit rounded-full mx-auto xl:mx-0 border-2 border-black bg-teal-500">{getInterestClass(level)}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className="flex absolute bottom-0 justify-around w-full hidden xl:block">
                <PerformanceDetails stage={elem['stage']} time={elem['time']} />
            </div>
            <div className="absolute cursor-pointer -top-7 xl:top-0 right-0 px-1 xl:pt-1.5 bg-[#FFF2E5] xl:bg-transparent border-2 xl:border-0 border-b-0 border-black rounded-t-lg" onClick={() => setOpenModal(!openModal)}>
                {svgIcons.cog}
            </div>
            {openModal &&
                <Modal
                    data={elem['keen']}
                    artist={elem['artist']}
                    day={elem['day']}
                    closeModal={setOpenModal}
                    index={elem['index']}
                />}
        </div>
    )
}
export default ScheduleCard