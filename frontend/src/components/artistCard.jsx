import Modal from "./modal";
import { useState, useEffect } from "react";
import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";
import ArtistCardSvg from "./artistCardSvg";

function ArtistCard({
    data,
    updateData,
    index,
    updateKeenComplete,
    inProgress,
    updateFailed,
    timedOut
}) {
    const [openModal, setOpenModal] = useState(false);
    const [keenData, setKeenData] = useState(data['keen']);

    const handleUpdate = async (data, day) => {
        let status = await updateData(index, data, day)
        if (status === "ok") {
            setKeenData(data);
            return "ok";
        } else {
            return "bad"
        }
    }

    return (
        <div class="fade-in relative">
            <a
                href={data['link']}
                id="title"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                <p class="max-w-sm mx-auto p-1 md:p-2 bg-[#F194B4] border-2 border-black rounded-t-lg truncate text-xs md:text-lg">{data['artist']}</p>
            </a>
            <div class="max-w-sm md:max-w-md mx-auto shadow flex flex-col justify-evenly bg-[#FFEBC6] border-2 border-t-0 border-black rounded-b-lg">
                <div className="w-full flex flex-col md:flex-row text-xs md:text-sm 2xl:text-[15px]">
                    <div class="md:w-8/12 w-full mx-auto">
                        <a href={data['link']} class="" target="_blank" rel="noopener noreferrer">
                            <img
                                class="md:rounded-b-lg md:rounded-r-none"
                                src={data['img']} alt="" />
                        </a>
                    </div>
                    <div class="md:w-4/12 md:border-l-2 min-h-[5rem] border-t-2 md:border-t-0 p-1 md:p-2 border-black w-full flex flex-col justify-around">
                        {keenData ?
                            <div class="font-normal text-gray-700 flex md:flex-col">
                                <div class="flex flex-col w-full md:h-[10rem] justify-center relative" id="peeps">
                                    <div className="w-full flex justify-center">
                                        <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 font-semibold">interested</p>
                                    </div>
                                    <div className="w-full flex lg:h-10 h-9 relative">
                                        <div className="flex w-full items-center justify-around">
                                            {keenData.split(";").map((dataEntry, index) => {
                                                const [name, keenness] = dataEntry.split("-");
                                                return (
                                                    <Tooltip text={name} key={index}>
                                                        <NameBubble name={name} keenness={keenness} />
                                                    </Tooltip>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="absolute cursor-pointer top-0 right-0 p-1 md:p-3 text-center w-fit" onClick={() => setOpenModal(!openModal)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -rotate-90">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            :
                            <div onClick={() => setOpenModal(!openModal)} className="cursor-pointer w-fit text-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 lg:size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>

                        }
                        {openModal &&
                            <Modal
                                data={keenData}
                                artist={data['artist']}
                                day={data['day']}
                                updateKeenData={handleUpdate}
                                closeModal={setOpenModal}
                                updateKeenComplete={updateKeenComplete}
                                inProgress={inProgress}
                                updateFailed={updateFailed}
                                timedOut={timedOut}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArtistCard;