import Modal from "./modal";
import { useState, useEffect } from "react";
import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";

function ArtistCard({
    data,
    updateData,
    index
}){
    const [openModal, setOpenModal] = useState(false);
    const [keenData, setKeenData] = useState(data['keen']);

    const handleUpdate = (data) =>{
        setKeenData(data);
        updateData(index, data)
    }
 
    return (
        <div class="py-5">        
            <div class="max-w-md md:max-w-md bg-white rounded-lg shadow mx-auto flex flex-col justify-evenly">
                <div class="w-fit mx-auto">
                    <a href={data['link']} class="w-10/12">
                        <img class="rounded-t-lg" src={data['img']} alt="" />
                    </a>
                </div>
                <div class="rounded-b-lg pl-2 sm:pl-4 w-full flex flex-col justify-evenly mx-auto bg-[#FFC857]">
                    <a href={data['link']} id="title" class=" mb-2 text-sm md:text-xl lg:text-2xl xl:text-3xl text-center font-bold tracking-tight text- text-brown-800 -outline-white">
                        <p class="pt-2 xl:h-16 truncate pr-4">{data['artist']}</p>
                    </a>
                    <div class="mb-3 font-normal text-gray-700 flex flex-col">
                        <div class="flex start" id="peeps">
                            <div class="flex items-center">      
                                <svg class="w-4 h-4 md:w-7 m:h-7 lg:w-8 lg:h-8 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z"/>
                                </svg>
                            </div>
                            <div className="w-full flex justify-center xl:h-24 lg:h-10 h-8 overflow-x-hidden">
                                {keenData ?
                                <div className="flex w-full grid grid-cols-2 md:w-10/12 place-items-center gap-y-1 lg:grid-cols-3 justify-around pt-1 md:pt-1 lg:pt-3">
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
                            <div class="flex items-center"> 
                                <svg class="w-4 h-4 md:w-7 m:h-7 lg:w-8 lg:h-8 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
                                </svg>
                            </div>
                            <div class="mx-auto my-auto">
                                <p class="tracking-widest font-sans text-xs md:text-lg xl:text-2xl text-brown-900 font-semibold">{data['day']}</p> 
                                {/* <img className="h-8 w-20 h-12 xl:h-10 lg:w-full" src={`https://way-out-west-app-backend.vercel.app/media/$.svg`} */}
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pb-1 mt-2" id="button">
                        <button onClick={()=>setOpenModal(!openModal)} type="button" class="py-1 mb-1 px-1.5 md:py-1 lg:py-1 md:px-4 lg:px-4 md:mb-1.5 lg:mb-2 text-[10px] md:text-sm xl:text-xl font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:text-teal-900">
                            Add interest
                        </button>
                    </div>
                    {openModal && <Modal data={keenData} artist={data['artist']} updateKeenData={handleUpdate} closeModal={setOpenModal} />} 
                </div>
            </div>
        </div>
    )
}

export default ArtistCard;