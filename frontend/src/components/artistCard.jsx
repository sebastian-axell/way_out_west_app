import Modal from "./modal";
import { useState, useEffect } from "react";
import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";
import svgIcons from "./svgIcon";

function ArtistCard({
    data,
    updateData,
    index,
    updateKeenComplete,
    inProgress
}){
    const [openModal, setOpenModal] = useState(false);
    const [keenData, setKeenData] = useState(data['keen']);

    const handleUpdate = (data) =>{
        setKeenData(data);
        updateData(index, data)
    }
 
    return (
        <div class="py-5 fade-in">
            <div class="max-w-md md:max-w-md bg-white rounded-lg shadow mx-auto flex flex-col justify-evenly">
                <div class="w-fit mx-auto">
                    <a href={data['link']} class="w-10/12">
                        <img class="rounded-t-lg" src={data['img']} alt="" />
                    </a>
                </div>
                <div class="rounded-b-lg pl-2 sm:pl-4 w-full flex flex-col justify-evenly mx-auto bg-[#FFC857]">
                    <a href={data['link']} id="title" class=" mb-2 text-sm sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-center font-bold tracking-tight text- text-brown-800 -outline-white">
                        <p class="pt-2 xl:h-12 truncate pr-4">{data['artist']}</p>
                    </a>
                    <div class="mb-3 font-normal text-gray-700 flex flex-col">
                        <div class="flex start" id="peeps">
                            <div class="flex items-center">{svgIcons.peeps}</div>
                            <div className="w-full flex justify-center lg:h-10 h-9 overflow-x-hidden">
                                {keenData ?
                                <div className="flex w-full grid grid-cols-2 md:w-10/12 place-items-center gap-y-1 lg:grid-cols-3 justify-around pt-1 md:pt-1">
                                    {keenData.split(";").map((dataEntry, index) =>{
                                        const [name, keenness] = dataEntry.split("-");
                                        return (
                                        <Tooltip text={name} key={index}>
                                            <NameBubble name={name} keenness={keenness}/>
                                        </Tooltip>
                                        );
                                    })}
                                </div>
                                :
                                <></>
                            }
                            </div>
                        </div>
                        <div class="flex start lg:mt-2" id="day">
                            <div class="flex items-center">{svgIcons.calender}</div>
                            <div class="mx-auto my-auto">
                                <p class="tracking-widest font-sans text-xs sm:text-base md:text-lg xl:text-xl text-brown-900 font-semibold">{data['day']}</p> 
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pb-1 mt-2" id="button">
                        <button onClick={()=>setOpenModal(!openModal)} type="button" class="py-1 md:py-1 lg:py-1 px-2 md:px-4 lg:px-4  mb-1 md:mb-1.5 lg:mb-2 text-[10px] sm:text-xs md:text-sm 2xl:text-[15px] font-semibold text-gray-800 bg-white rounded-full shadow-md border border-gray-400 hover:border-gray-600 focus:border-gray-600 focus:outline-none">
                            Add interest
                        </button>
                    </div>
                    {openModal && <Modal data={keenData} artist={data['artist']} updateKeenData={handleUpdate} closeModal={setOpenModal} updateKeenComplete={updateKeenComplete} inProgress={inProgress}/>} 
                </div>
            </div>
        </div>
    )
}

export default ArtistCard;