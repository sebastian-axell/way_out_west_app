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
                <a href={item['link']} class="w-full flex justify-center relative border-l-2 border-r-2 border-black rounded-b-lg" target="_blank" rel="noopener noreferrer">
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
                <div className="absolute block bottom-0 left-0 w-full cursor-pointer" onClick={() => { setOpenModal(true) }}>
                    <div className="px-2 block border-2 bg-white text-center border-black border-lg rounded-lg rounded-t-none">
                        <button className="">modify interest</button>
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