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
                return "😍"
            case "whyNot":
                return "🤷"
            case "deffo":
                return "🤝"
            default:
                return '';
        }
    };
    return (
        <div className="my-1.5 md:my-4 relative">
            <div class="relative w-10/12 md:w-8/12 3xl:w-10/12 mx-auto font-bold">
                <div className="bg-[#F194B4] bg-opacity-50 p-1 mx-auto text-center border-2 rounded-lg border-black rounded-b-none truncate">{item['artist']}</div>
                <a href={item['link']} class="w-full flex justify-center relative border-2 border-t-0 border-black rounded-b-lg" target="_blank" rel="noopener noreferrer">
                    <img src={item['img']} className="opacity-50 rounded-b-lg" alt="" />
                    <div className="w-10/12 md:w-8/12 absolute h-full flex ">
                        <div className="h-5/6 w-full flex flex-col justify-around">
                            {
                                item['keen'].split(";").map((interest) => {
                                    const [name, level] = interest.split("-");
                                    return (
                                        <div className={`relative p-1 md:p-1 flex justify-between bg-[#FAF0E6] border-2 border-black rounded-lg text-center bg-teal-500`}>
                                            <p className={`p-1`}>{name}</p>
                                            <p className="absolute text-base -right-3 p-1 rounded-full border border-gray-400 bg-[#006400]">{getInterestClass(level)}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </a>
                <div className="absolute cursor-pointer bottom-0 right-0 p-5 pb-3 text-center w-fit" onClick={() => setOpenModal(!openModal)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
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