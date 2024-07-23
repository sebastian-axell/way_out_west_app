import Modal from "./modal";
import { useState } from "react";
import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";
import svgIcons from "./svgIcon";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";

function ArtistCard({
    index,
    artistData
}) {
    const [openModal, setOpenModal] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        isAuthenticated ? setOpenModal(!openModal) : navigate("/me")
    }

    return (
        <div class="fade-in">
            <div class="max-w-sm md:max-w-lg mx-auto shadow flex flex-col justify-evenly bg-[#FFEBC6] border-2 border-black rounded-lg">
                <div className="w-full h-full flex flex-col text-xs md:text-sm 2xl:text-[15px]">
                    <div class="w-full mx-auto relative">
                        <a href={artistData['link']} class="" target="_blank" rel="noopener noreferrer">
                            <img
                                class="rounded-t-md aspect-square"
                                src={artistData['img']} alt="" />
                        </a>
                        <a
                            href={artistData['link']}
                            id="title"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                            <p class="max-w-sm absolute bottom-0 md:max-w-md lg:max-w-full mx-auto p-1 md:p-2 bg-[#F194B4] border-2 border-b-0 border-black rounded-t-lg truncate text-xs md:text-lg">{artistData['artist']}</p>
                        </a>
                    </div>
                    <div class="min-h-[5rem] md:min-h-[6rem] border-t-2 border-black w-full flex flex-col justify-around">
                        {isAuthenticated ?
                            <div class="font-normal text-gray-700 flex md:flex-col">
                                <div class="flex flex-col w-full justify-center relative p-3 pt-1" id="peeps">
                                    <div className="w-full flex justify-center">
                                        <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 font-semibold">interested</p>
                                    </div>
                                    <div className="w-full flex lg:h-10 h-9">
                                        <div className="flex w-full items-center justify-around">
                                            {artistData['keen'].split(";").map((dataEntry, index) => {
                                                const [name, keenness] = dataEntry.split("-");
                                                return (
                                                    <Tooltip text={name} key={name + keenness + artistData['link']}>
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
                                {
                                    isAuthenticated ?
                                        svgIcons.add
                                        :
                                        svgIcons.lock
                                }
                            </div>

                        }
                        {
                            openModal &&
                            <Modal
                                data={artistData['keen']}
                                artist={artistData['artist']}
                                day={artistData['day']}
                                closeModal={setOpenModal}
                                index={index}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ArtistCard;