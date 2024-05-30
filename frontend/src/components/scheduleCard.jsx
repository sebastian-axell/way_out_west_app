import { useState } from "react";
import Modal from "./modal";

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

    const handleUpdate = async (keenData, day) => {

        let status = await updateData(item['index'], keenData, day)
        if (status === "ok") {
            setKeenData(keenData);
            return "ok";
        } else {
            return "bad"
        }
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
                    <div className="w-full flex flex-col justify-start h-full border-2 border-black relative bg-pink-50 ">
                        <div className="hidden xl:block bg-yellow-300 border-b-2 border-black ">
                            <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 text-center font-semibold">interested</p>
                        </div>
                        <div className="w-full h-full flex flex-row justify-around mb-8 text-base lg:text-md 2xl:text-lg">
                            {
                                item['keen'].split(";").map((interest) => {
                                    const [name, level] = interest.split("-");
                                    return (
                                        <div className={`relative p-0.5 md:p-1 flex flex-col justify-center text-center`}>
                                            <p className={`p-1`}>{name}</p>
                                            <p className="p-2 xl:p-1 2xl:p-2 lg:text-xl w-fit mx-auto rounded-full bg-pink-900">{getInterestClass(level)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="absolute cursor-pointer bottom-0 right-0 text-center w-fit p-1" onClick={() => setOpenModal(!openModal)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                            </svg>
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