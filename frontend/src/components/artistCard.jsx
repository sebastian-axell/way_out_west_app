import Modal from "./modal";
import { useState } from "react";
import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";
import svgIcons from "./svgIcon";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

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
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        isAuthenticated ? setOpenModal(!openModal) : navigate("/me")
    }

    const handleUpdate = async (data, day) => {
        let status = await updateData(index, data, day)
        if (status === "success") {
            setKeenData(data);
        }
        return status
    }

    return (
        <div class="fade-in ">
            <div class="max-w-sm md:max-w-lg mx-auto shadow flex flex-col justify-evenly bg-[#FFEBC6] border-2 border-black rounded-lg">
                <div className="w-full h-full flex flex-col text-xs md:text-sm 2xl:text-[15px]">
                    <div class="w-full mx-auto relative">
                        <a href={data['link']} class="" target="_blank" rel="noopener noreferrer">
                            <img
                                class="rounded-t-md"
                                src={data['img']} alt="" />
                        </a>
                        <a
                            href={data['link']}
                            id="title"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                            <p class="max-w-sm absolute bottom-0 md:max-w-md lg:max-w-full mx-auto p-1 md:p-2 bg-[#F194B4] border-2 border-b-0 border-black rounded-t-lg truncate text-xs md:text-lg">{data['artist']}</p>
                        </a>
                    </div>
                    <div class="min-h-[5rem] md:min-h-[6rem] border-t-2 border-black w-full flex flex-col justify-around">
                        {isAuthenticated && keenData ?
                            <div class="font-normal text-gray-700 flex md:flex-col">
                                <div class="flex flex-col w-full justify-center relative p-3 pt-1" id="peeps">
                                    <div className="w-full flex justify-center">
                                        <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 font-semibold">interested</p>
                                    </div>
                                    <div className="w-full flex lg:h-10 h-9">
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
                                    <div className="absolute cursor-pointer top-0 md:bottom-0 right-0 p-1 md:p-3 md:pr-2 md:pt-1 text-center w-fit" onClick={handleClick}>
                                        {svgIcons.cog}
                                    </div>
                                </div>
                            </div>
                            :
                            <div onClick={handleClick} className="cursor-pointer w-fit text-center mx-auto p-3">
                                {svgIcons.add}
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