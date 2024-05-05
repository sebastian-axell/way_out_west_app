import { useState } from "react";
import KeenOption from "./keenOption";
import ModalButton from "./modalButton";
import ConfirmationButton from "./confirmationButton";
import InProgressButton from "./inProgressButton";
import svgIcons from "./svgIcon";
import FailedButton from "./failedButton";

const names = ["luke","robbie","seb"]

function Modal({
    closeModal,
    data,
    updateKeenData,
    artist,
    updateKeenComplete,
    inProgress,
    updateFailed,
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

    const closeModalHandle =()=>{
        closeModal(false)
    }
    
    const updateKeenDataHandle = () =>{
        const dataString = Object.entries(selectedOptions).map(([name, keenness]) =>{
            return name + "-" + keenness;
        }).join(";")
        if (data != dataString){
            updateKeenData(dataString);
            setTimeout(() => {
                closeModalHandle();
            }, 2500); 
        } else{
            closeModalHandle();
        }
    }
    return (
        <div className="z-10 h-screen w-screen bg-opacity-50 bg-pink-100 flex fixed justify-center items-center top-0 left-0 right-0">
            <div className="px-3 md:px-5 py-5 bg-pink-50 shadow rounded-lg border w-11/12 h-fit sm:w-fit overflow-y-auto">
                <div className='flex justify-end'>
                <button className='sm:-mr-0 lg:-mr-2 sm:-mt-4 -mt-3 -mr-1 relative' onClick={()=> closeModalHandle()}>
                    {svgIcons.cross}
                </button>
                </div>
                <div className="-mt-3 flex flex-col gap-y-5 min-h-full flex-1 place-content-center justify-around">
                    <div className="text-center md:mb-3">
                        <h1 className="text-xl lg:text-3xl font-bold text-green- tracking-tight">Add interest for {artist}</h1>
                    </div>
                    <div className="flex grid grid-cols-6 text-2xl gap-y-3 text-center items-center">
                        {names.map((name, index) =>{
                            return (
                            <>
                            <div className="flex justify-center pr-4 col-span-full sm:col-span-1 text-base font-semibold md:text-lg mt-2 sm:mt-0">{name}</div>
                            <ul class="flex w-full gap-x-2 col-span-full sm:col-span-5 justify-around">
                                <KeenOption keenLevel={"whyNot"} title={"why not"} body={"don't mind going"} idTag={"why-not-"+index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                                <KeenOption keenLevel={"deffo"} title={"deffo keen"} body={'tis would be a good one'} idTag={"deffo-keen-"+index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                                <KeenOption keenLevel={"hella"} title={"hella keen"} body={"bruh I'll go by myself"} idTag={"hella-keen-"+index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                            </ul>
                            </>
                            )
                        })}
                    </div>
                    <div className="flex grid-2 gap-x-3 pt-1 w-full justify-around">
                        <ModalButton text={'Cancel'} onClickHandle={closeModalHandle}/>
                        <ModalButton text={'Confirm'} onClickHandle={updateKeenDataHandle} disabled={inProgress}/>
                    </div>
                    {
                        inProgress ? <InProgressButton /> :
                        updateKeenComplete ? <ConfirmationButton /> :
                        updateFailed && <FailedButton />
                    }
                </div>
            </div>
        </div>
    );
}
export default Modal;