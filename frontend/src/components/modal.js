import { useState } from "react";

const names = ["luke","robbie","seb","longassname","b","c"]

function Modal({
    closeModal,
    data,
    updateKeenData,
    artist
}) {
    const [selectedOptions, setSelectedOptions] = useState(() => {
        const keenMapping = {};
        data.split(";").forEach((dataEntry) => {
          const [name, keenness] = dataEntry.split("-");
          if (names.includes(name)) {
            keenMapping[name] = keenness;
          }
        });
        return keenMapping;
      });
    
    const handOnClick = (name, keeness) =>{
        if (selectedOptions[name] == keeness) {
            setSelectedOptions(prevState => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
              });
        }
    }
    const handleChange = (name, keenness) =>{
        setSelectedOptions({
            ...selectedOptions,
            [name]: keenness,
          });
    };
    
    const updateKeenDataHandle = () =>{
        const dataString = Object.entries(selectedOptions).map(([name, keenness]) =>{
            return name + "-" + keenness;
        }).join(";")
        updateKeenData(dataString);
        closeModal(false)
    }
    return (
        <div className="z-10 h-screen w-screen bg-opacity-50 bg-pink-100 flex fixed justify-center items-center top-0 left-0 right-0">
            <div className="px-3 md:px-5 py-5 bg-pink-50 shadow rounded-lg border w-11/12 sm:w-9/12 lg:w-7/12 xl:w-4/12 h-3/6 md:h-3/6 overflow-y-scroll">
                <div className='flex justify-end'>
                <button className='sm:-mr-0 sm:-mt-3 -mt-3 -mr-2 relative' onClick={()=> closeModal(false)}>
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                </button>
                </div>
                <div className="-mt-4 flex flex-col gap-y-5">
                    <div className="text-center md:mb-3">
                        <h1 className="text-xl  lg:text-4xl font-bold text-green- tracking-tight">Add interest for {artist}</h1>
                    </div>
                    <div className="flex grid grid-cols-6 text-2xl gap-y-3 text-center items-center">
                        {names.map((name, index) =>{
                            return (
                            <>
                            <div className="flex justify-center pr-4 col-span-full sm:col-span-1 text-base md:text-lg mt-2 sm:mt-0">{name}</div>
                            <ul class="flex w-full gap-x-2 col-span-full sm:col-span-5 justify-around">
                                <li >
                                    <input onChange={()=>handleChange(name, 'whyNot')} onClick={()=>handOnClick(name, "whyNot")} type="radio" id={`why-not-`+index} name={name} checked={selectedOptions[name] == "whyNot" ? true : false} class="hidden peer" required />
                                    <label for={`why-not-`+index} class={`h-full inline-flex items-center justify-center w-fit p-1 md:p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-amber-400 peer-checked:text-amber-900 hover:text-gray-600 hover:bg-gray-100`}>                           
                                        <div class="">
                                            <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base font-semibold">why not</div>
                                            <div class="w-fit text-xs sm:text-sm lg:text-base">don't mind going</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input onChange={()=>handleChange(name, 'deffo')} onClick={()=>handOnClick(name, "deffo")} type="radio" id={`deffo-keen-`+index} name={name} checked={selectedOptions[name] == "deffo" ? true : false} class="hidden peer" required />
                                    <label for={`deffo-keen-`+index} class="h-full inline-flex items-center justify-center w-fit p-1 md:p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-green-200 peer-checked:text-green-600 hover:text-gray-600 hover:bg-gray-100">                           
                                        <div class="">
                                            <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base font-semibold">deffo keen</div>
                                            <div class="w-fit text-xs sm:text-sm lg:text-base">'tis would be a good one</div>
                                        </div>
                                    </label>
                                </li>
                                <li>
                                    <input onChange={()=>handleChange(name, 'hella')} onClick={()=>handOnClick(name, "hella")} type="radio" id={`hella-keen-`+index} name={name} checked={selectedOptions[name] == "hella" ? true : false} class="hidden peer" required />
                                    <label for={`hella-keen-`+index} class="h-full inline-flex items-center justify-center w-fit p-1 md:p-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-200 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100">                           
                                        <div class="">
                                            <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base font-semibold">hella keen</div>
                                            <div class="w-fit text-xs sm:text-sm lg:text-base">bruh I'll go by myself</div>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                            </>
                            )
                        })}
                    </div>
                    <div className="flex grid-2 gap-x-3 pt-1 w-full justify-around">
                        <button class="py-1 px-2 mb-1 md:py-1 lg:py-1.5 md:px-3 lg:px-5 text-xs md:text-sm lg:text-md font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-yellow-100 hover:text-green-800" onClick={()=> closeModal(false)}>Cancel</button>
                        <button class="py-1 px-2 mb-1 md:py-1 lg:py-1.5 md:px-3 lg:px-5 text-xs md:text-sm lg:text-md font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-yellow-100 hover:text-green-800" onClick={()=> updateKeenDataHandle()}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Modal;