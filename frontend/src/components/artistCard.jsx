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
                <p class="p-1 md:p-2 bg-[#F194B4] border-2 border-black rounded-t-lg  truncate text-xs md:text-lg">{data['artist']}</p>
            </a>
            <div class="max-w-md shadow mx-auto flex flex-col justify-evenly bg-[#FFEBC6] border-2 border-t-0 border-black rounded-b-lg">
                <div className="w-full flex flex-col md:flex-row text-xs md:text-sm 2xl:text-[15px]">
                    <div class="md:w-8/12 w-full mx-auto">
                        <a href={data['link']} class="" target="_blank" rel="noopener noreferrer">
                            <img
                                class="md:rounded-b-lg md:rounded-r-none"
                                src={data['img']} alt="" />
                        </a>
                    </div>
                    <div class="md:w-4/12 md:border-l-2 min-h-[5.5rem] border-t-2 md:border-t-0 p-1 md:p-2 border-black w-full flex flex-col justify-around mx-auto rounded-b-lg md:rounded-l-none">
                        {keenData ?
                            <div class="font-normal text-gray-700 flex md:flex-col">
                                <div class="flex flex-col w-full mb-4 md:mb-0" id="peeps">
                                    <div className="w-full flex justify-center items-center">
                                        <p className="tracking-widest font-sans p-1 text-brown-900 font-semibold">who's keen</p>
                                    </div>
                                    <div className="w-full flex justify-center lg:h-10 h-9 overflow-x-hidden relative">
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
                                    <div className="absolute cursor-pointer bottom-0 right-0 text-center rounded-l rounded-t-none border-2 font-semibold bg-white p-0.5 border-black border-lg w-full md:w-1/3" onClick={() => setOpenModal(!openModal)}>
                                        <button className="">modify interest</button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div  onClick={() => setOpenModal(!openModal)} className="cursor-pointer px-2 rounded-lg border-2 bg-white text-center border-black border-lg w-8/12 mx-auto md:w-10/12">
                                <button className="font-semibold">add interest</button>
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
{/* <div class="w-full flex justify-center hidden md:block" id="button"> */}
{/* <button onClick={() => setOpenModal(!openModal)} type="button" class="p-1 px-2 text-[10px] sm:text-xs md:text-sm 2xl:text-[15px] w-full font-semibold text-gray-800 bg-white rounded-full shadow-md border-2 border-gray-400 hover:border-gray-600 focus:border-gray-600 focus:outline-none">
        Add interest
    </button> */}
{/* <div className="px-2 rounded-lg rounded-t-none border-t-2  bg-white text-center border-black border-lg w-full" onClick={() => setOpenModal(!openModal)}>
    <button className="">modify interest</button>
</div> */}
{/* </div> */}
export default ArtistCard;