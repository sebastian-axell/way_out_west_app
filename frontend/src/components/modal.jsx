import { useAuth } from "../authContext";
import { useContext, useRef, useState } from "react";
import KeenOption from "./keenOption";
import ModalButton from "./modalButton";
import svgIcons from "./svgIcon";
import ResponseEmoji from "./responseEmojis";
import constants from "../auxiliary/constants";
import { DataContext } from "./dataContext";

const names = constants.names

function Modal({
    closeModal,
    data,
    artist,
    day,
    index
}) {
    function createKeenMapping() {
        return data.split(";")
            .map(interest => interest.split("-"))
            .filter(([name, keenness]) => names.includes(name))
            .reduce((keenMapping, [name, keenness]) => {
                keenMapping[name] = keenness;
                return keenMapping;
            }, {});
    }
    const { isAuthenticated, user } = useAuth();
    function determineMyInterest() {
        const interests = data.split(";");
        let myInterest;
        interests.some(interest => {
            const [name, keenness] = interest.split("-");
            if (user.username === name) {
                myInterest = keenness
                return;
            }
        })
        return myInterest;
    }
    const [, makeUpdate] = useContext(DataContext);
    const [inProgress, setInProgress] = useState(false);
    const [state, setState] = useState("waiting")
    const [keenLevel, setKeenLevel] = useState(determineMyInterest)
    const keenData = useRef(createKeenMapping());

    const handleOnClick = (keenness) => {
        if (keenData.current[user.username] == keenness) {
            const newState = { ...keenData.current };
            delete newState[user.username];
            keenData.current = newState;
            setKeenLevel("");
        } else {
            setKeenLevel(keenness)
            keenData.current = { ...keenData.current, [user.username]: keenness }
        }
    }

    const closeModalHandle = () => {
        closeModal(false)
    }

    const updateKeenDataHandle = async () => {
        let dataString = Object.entries(keenData.current)
            .map(([name, keenness]) => {
                return name + "-" + keenness;
            }).join(";")
        if (data != dataString) {
            setInProgress(true)
            makeUpdate(index, dataString, day).then(response => {
                setState(response)
                setTimeout(() => {
                    setInProgress(false)
                    closeModalHandle();
                }, constants.modalTimeOut);
            })
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
                        {
                            isAuthenticated &&
                            <ul class="flex w-fit flex-col gap-y-2 justify-around">
                                <KeenOption
                                    optionLevel={"whyNot"}
                                    keenLevel={keenLevel}
                                    handleOnClick={handleOnClick} />
                                <KeenOption
                                    optionLevel={"deffo"}
                                    keenLevel={keenLevel}
                                    handleOnClick={handleOnClick} />
                                <KeenOption
                                    optionLevel={"hella"}
                                    keenLevel={keenLevel}
                                    handleOnClick={handleOnClick} />
                            </ul>
                        }
                    </div>
                    <div className="flex grid-2 gap-x-3 pt-1 w-full justify-around">
                        <ModalButton text={'Cancel'} onClickHandle={closeModalHandle} />
                        <ModalButton text={'Confirm'} onClickHandle={updateKeenDataHandle} disabled={inProgress} />
                    </div>
                    {
                        inProgress ? <ResponseEmoji state={state} /> : <></>
                    }
                </div>
            </div>
        </div>
    );
}
export default Modal;