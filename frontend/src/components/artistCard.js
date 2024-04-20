

function ArtistCard({
    data
}){
    return (
        <div class="py-5 ">        
            <div class="max-w-md sm:max-w-xs bg-white rounded-lg shadow mx-auto flex flex-col justify-evenly">
                <div class="w-fit mx-auto">
                    <a href={data['link']} class="w-10/12">
                        <img class="rounded-t-lg" src={data['img']} alt="" />
                    </a>
                </div>
                <div class="rounded-b-lg pl-2 sm:pl-4 w-full flex flex-col justify-evenly mx-auto bg-green-200">
                    <a href={data['link']} id="title" class=" mb-2 text-md sm:text-2xl text-center font-bold tracking-tight text-gray-900">
                        <p class="pt-2 truncate pr-4">{data['artist']}</p>
                    </a>
                    <div class="mb-3 font-normal text-gray-700 flex flex-col gap-y-2">
                        <div class="flex start" id="peeps">
                            <div class="flex-none">      
                                <svg class="w-6 h-6 sm:w-8 sm:h-8 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div class="flex mx-auto my-auto flex-wrap" id="people list">
                                {data['keen'] ? 
                                <div class="w-5 h-5 xs:w-6 xs:h-7 sm:w-8 sm:h-8 relative inline-flex items-center justify-center bg-green-300 rounded-full">
                                    <span class="font-medium text-xs sm:text-lg text-green-800">{data['keen'] ? Array.from(data['keen']).at(0): ""}</span>
                                </div>
                                :
                                <>RIP</>
                            }
                            </div>
                        </div>
                        <div class="flex start" id="day">
                            <div class="flex-none"> 
                                <svg class="w-6 h-6 sm:w-8 sm:h-8 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clip-rule="evenodd"/>
                                </svg>
                            </div>
                            <div class="mx-auto my-auto">
                                <p class="tracking-widest font-sans text-sm sm:text-lg font-semibold">{data['day']}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center pb-1" id="button">
                        <button type="button" class="py-1 px-3 me-1 mb-1 sm:py-2.5 sm:px-5 sm:me-2 sm:mb-2 text-xs sm:text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-yellow-100 hover:text-green-800">
                            Add interest
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default ArtistCard;