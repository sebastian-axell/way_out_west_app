import { useState, useEffect } from "react"
import svgIcons from "./svgIcon";
import constants from "../auxiliary/constants";


function LoginModal({
    handleSubmit,
    selectedIndex,
    setLoading,
    names
}) {
    // const [selectedIndex, setSelectedIndex] = useState(0)
    // const [loading, setLoading] = useState(false)
    // const names = constants.names
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const [isShaking, setIsShaking] = useState(false)
    const formSubmit = async (event) => {
        // setLoading(true)
        event.preventDefault();
        const response = await handleSubmit(names[selectedIndex], password);
        if (response['status'] == 401) {
            setIsShaking(true)
            setErrorMessage(response['message'])
            console.log(errorMessage);
        }
        setLoading(false)
        setPassword("");
    };

    // useEffect(() => {
    //     const handleKeyDown = (event) => {
    //         switch (event.key) {
    //             case 'ArrowUp':
    //                 navigateDivs("up");
    //                 break;
    //             case 'ArrowDown':
    //                 navigateDivs("down");
    //                 break;
    //             case 'ArrowLeft':
    //                 navigateDivs('left');
    //                 break;
    //             case 'ArrowRight':
    //                 navigateDivs('right');
    //                 break;
    //             default:
    //                 break;
    //         }
    //     };

    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [selectedIndex]);

    // const navigateDivs = (direction) => {
    //     setSelectedIndex((prevIndex) => {
    //         if (direction === 'left' || direction === 'up') {
    //             return prevIndex > 0 ? prevIndex - 1 : names.length - 1;
    //         } else if (direction === 'right' || direction === 'down') {
    //             return prevIndex < names.length - 1 ? prevIndex + 1 : 0;
    //         }
    //         return prevIndex;
    //     });
    // }

    useEffect(() => {
        if (isShaking) {
            const timer = setTimeout(() => {
                setIsShaking(false)
                setErrorMessage("")
            }, 2000);
            return () => clearTimeout(timer);
        }

    }, [errorMessage])

    return (
        <div className="">
        <form onSubmit={formSubmit} className="flex flex-col lg:flex-row relative">
            <label htmlFor="password" className="border-2 border-black lg:rounded-lg lg:rounded-r-none p-1 text-center text-white bg-slate-600 font-semibold">enter brocode</label>
            <input
                autoFocus
                className="border-2 lg:border-l-0 border-t-0 lg:border-t-2 lg:rounded-r-lg border-black pl-2 focus:outline-none"
                type="password"
                value={password}
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="get it wrong n ur dead"
            />
            <div className="flex items-center">
                <button type="submit" className="lg:absolute -right-2 mx-auto mt-2 lg:mt-0 focus:outline-none">
                    {svgIcons.formButton}
                </button>
            </div>
        </form>
        <p className={`font-bold text-red-900 text-center ${isShaking ? 'shake' : ''}`}>{errorMessage}</p>
    </div>
        // <div className="flex justify-center items-center fixed top-1/3 left-0 right-0">
        //     <div className="w-full h-full flex justify-center items-center">
        //         <div className="border-2 border-black w-[18rem] lg:w-[24rem]">
        //             <div className="p-5 bg-slate-600 text-white border-b-2 border-black text-center font-bold text-lg">login</div>
        //             <div className="bg-[#FFEBC6] p-5 pb-2 lg:pb-5 flex flex-col gap-y-6">
        //                 <div className="flex lg:flex-col">
        //                     <p className="flex items-center lg:justify-center p-3 lg:p-5 lg:pt-0 text-xl font-bold">pick your fighter</p>
        //                     <div className="flex flex flex-col lg:flex-row gap-2 justify-around w-10/12 lg:w-full mx-auto">
        //                         {
        //                             names.map((name, index) => {
        //                                 return (
        //                                     <button key={index} id="index" value={index} onClick={() => setSelectedIndex(index)}
        //                                         className={`cursor-pointer w-10/12 mx-auto ${selectedIndex === index ? "bg-slate-800 font-bold text-white" : ""}`}>
        //                                         {name}
        //                                     </button>
        //                                 )
        //                             })
        //                         }
        //                     </div>
        //                 </div>
        //                 {
        //                     loading ?
        //                         <LoadingComponent />
        //                         :
        //                         <div>
        //                             <form onSubmit={formSubmit} className="flex flex-col lg:flex-row relative">
        //                                 <label htmlFor="password" className="border-2 border-black lg:rounded-lg lg:rounded-r-none p-1 text-center text-white bg-slate-600 font-semibold">enter brocode</label>
        //                                 <input
        //                                     autoFocus
        //                                     className="border-2 lg:border-l-0 border-t-0 lg:border-t-2 lg:rounded-r-lg border-black pl-2 focus:outline-none"
        //                                     type="password"
        //                                     value={password}
        //                                     id="password"
        //                                     onChange={(event) => setPassword(event.target.value)}
        //                                     placeholder="get it wrong n ur dead"
        //                                 />
        //                                 <div className="flex items-center">
        //                                     <button type="submit" className="lg:absolute -right-2 mx-auto mt-2 lg:mt-0 focus:outline-none">
        //                                         {svgIcons.formButton}
        //                                     </button>
        //                                 </div>
        //                             </form>
        //                             <p className={`font-bold text-red-900 text-center ${isShaking ? 'shake' : ''}`}>{errorMessage}</p>
        //                         </div>
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
export default LoginModal