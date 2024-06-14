import { useAuth } from "../authContext";
import { useState } from "react";
import KeenOption from "./keenOption";
import ModalButton from "./modalButton";
import svgIcons from "./svgIcon";
import ResponseEmoji from "./responseEmojis";
import constants from "../auxiliary/constants";

const names = constants.names

function Modal({
    closeModal,
    data,
    updateKeenData,
    artist,
    day,
    updateKeenComplete,
    inProgress,
    updateFailed,
    timedOut
}) {
    const { isAuthenticated, user } = useAuth();
    const [state, setState] = useState()
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

    const handOnClick = (name, keeness) => {
        if (selectedOptions[name] == keeness) {
            setSelectedOptions(prevState => {
                const newState = { ...prevState };
                delete newState[name];
                return newState;
            });
        }
    }
    const handleChange = (name, keenness) => {
        setSelectedOptions({
            ...selectedOptions,
            [name]: keenness,
        })
    };

    const closeModalHandle = () => {
        closeModal(false)
    }

    const updateKeenDataHandle = async () => {
        let dataString = Object.entries(selectedOptions).map(([name, keenness]) => {
            return name + "-" + keenness;
        }).join(";")
        if (data != dataString) {
            setState(await updateKeenData(dataString, day))
            const timer = setTimeout(() => {
                closeModalHandle();
            }, constants.modalTimeOut);
            return () => clearTimeout(timer);
        } else {
            closeModalHandle();
        }
    }
    return (
        <div className="z-10 h-screen w-screen bg-opacity-50 bg-pink-200 flex fixed justify-center items-center top-0 left-0 right-0 font-semibold">
            <div className="p-4 bg-[#FFEBC6] shadow rounded-lg border-2 border-black w-8/12 h-fit sm:w-fit relative">
                <button className='absolute top-0 right-0 p-2 pt-1 pr-1' onClick={() => closeModalHandle()}>
                    {svgIcons.cross}
                </button>
                <div className="-mt-3 flex flex-col gap-y-3 lg:gap-y-5 place-content-center justify-around">
                    <div className="text-center">
                        <h1 className="text-base md:text-lg lg:text-3xl font-bold tracking-tight pt-4">Add interest for: <br />{artist}</h1>
                    </div>
                    <div className="flex text-2xl text-center items-center justify-center">
                        {names.map((name, index) => {
                            return (
                                isAuthenticated && name == user.username &&
                                <ul class="flex w-fit flex-col gap-y-2 justify-around">
                                    <KeenOption keenLevel={"whyNot"} title={"wittle bit keen"} body={"don't mind going"} idTag={"why-not-" + index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                                    <KeenOption keenLevel={"deffo"} title={"deffo keen"} body={'tis be a good one'} idTag={"deffo-keen-" + index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                                    <KeenOption keenLevel={"hella"} title={"hella keen"} body={"bruh I'm going"} idTag={"hella-keen-" + index} name={name} selectedOptions={selectedOptions} handleChange={handleChange} handOnClick={handOnClick} />
                                </ul>
                            )
                        })}
                    </div>
                    <div className="flex grid-2 gap-x-3 pt-1 w-full justify-around">
                        <ModalButton text={'Cancel'} onClickHandle={closeModalHandle} />
                        <ModalButton text={'Confirm'} onClickHandle={updateKeenDataHandle} disabled={inProgress} />
                    </div>
                    {
                        inProgress ? <ResponseEmoji state={"waiting"} /> :
                            updateKeenComplete ? <ResponseEmoji state={state} /> :
                                timedOut ? <ResponseEmoji state={"timeout"} /> :
                                    updateFailed && <ResponseEmoji state={state} />
                    }
                </div>
            </div>
        </div>
    );
}
export default Modal;