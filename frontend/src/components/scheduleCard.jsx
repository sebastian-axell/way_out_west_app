import { useState } from "react";
import Modal from "./modal";
import svgIcons from "./svgIcon";

function ScheduleCard({
    item,
    updateData,
    updateKeenComplete,
    inProgress,
    updateFailed,
    timedOut
}) {
    const [openModal, setOpenModal] = useState(false);
    const [keenData, setKeenData] = useState(item['keen']);
    const keenItems = item['keen'].split(";")

    const handleUpdate = async (keenData, day) => {
        let status = await updateData(item['index'], keenData, day)
        if (status === "success") {
            setKeenData(keenData);
        }
        return status
    }
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
        <div className="h-full">
            <div class="relative mx-auto font-bold h-full">
                <div className="flex flex-row h-full">
                    <div className="w-full flex flex-col justify-start h-full border-2 border-black relative bg-[#FFF2E5] ">
                        <div className="hidden xl:block">
                            <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 text-center font-semibold border-b-2 border-black">interested</p>
                        </div>
                        <div className={`h-full flex flex-row xl:flex-col justify-around xl:justify-start mb-1 lg:mb-8 w-full`}>
                            {
                                keenItems.map((interest) => {
                                    const [name, level] = interest.split("-");
                                    return (
                                        <div className={`relative p-0.5 md:p-1 flex flex-col xl:flex-row justify-center justify-between text-center items-center`}>
                                            <p className={`p-1 lg:text-xl`}>{name}</p>
                                            <p className="p-0.5 px-1 lg:text-xl w-fit rounded-full mx-auto xl:mx-0 border-2 border-black bg-teal-500">{getInterestClass(level)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="absolute cursor-pointer -top-7 xl:top-0 right-0 px-1 xl:pt-1.5 bg-[#F194B4] xl:bg-transparent border-2 xl:border-0 border-b-0 border-black rounded-t-lg" onClick={() => setOpenModal(!openModal)}>
                            {svgIcons.cog}
                        </div>
                    </div>
                </div>
                {openModal &&
                    <Modal
                        data={keenData}
                        artist={item['artist']}
                        day={item['day']}
                        updateKeenData={handleUpdate}
                        closeModal={setOpenModal}
                        updateKeenComplete={updateKeenComplete}
                        inProgress={inProgress}
                        updateFailed={updateFailed}
                        timedOut={timedOut}
                    />}
            </div>
        </div>
    )
}
export default ScheduleCard