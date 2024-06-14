import { useState, useEffect } from "react";
import { useAuth } from "../authContext";

function Profile({
    data,
    days,
    selectedIndex
}) {
    // const days = ["thursday", "friday", "saturday"]
    // const [selectedIndex, setSelectedIndex] = useState(0)
    const { user } = useAuth();
    const [profileSelections, setProfileSelections] = useState(null)
    const [loading, setLoading] = useState(true)
    const pattern = new RegExp(`${user.username}-.*`);
    console.log(selectedIndex);

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
    //             return prevIndex > 0 ? prevIndex - 1 : days.length - 1;
    //         } else if (direction === 'right' || direction === 'down') {
    //             return prevIndex < days.length - 1 ? prevIndex + 1 : 0;
    //         }
    //         return prevIndex;
    //     });
    // }

    // useEffect(() => {
    //     const newFilteredData = {};
    //     days.forEach(day => {
    //         newFilteredData[day] = Object.values(data[day]).filter(
    //             entry => pattern.test(entry['keen'])
    //         );
    //     });
    //     setProfileSelections(newFilteredData)
    //     setLoading(false)
    // }, [data, days, pattern])

    return (
        <div className="">
        {
            Object.keys(data).map((elem) => (
                <div className="">
                    <div key={elem} className={`p-3 grid md:grid-cols-2 max-h-[400px] overflow-auto ${elem == days[selectedIndex] ? "" : "hidden"}`}>
                        {
                            data[elem].map((item) => (
                                pattern.test(item['keen']) &&
                                <div className="px-2">
                                    <div className="relative">
                                        <a
                                            href={item['link']}
                                            id="title"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="w-full font-bold text-center tracking-tight text-brown-800">
                                            <p class="truncate">{item['artist']}</p>
                                        </a>
                                        <img src={item['img']} className="border-2 border-black" alt="" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
        </div>
        // <div className="flex justify-center items-center fixed top-1/3 left-0 right-0">
        //     <div className="w-full h-full flex justify-center items-center">
        //         <div className="border-2 border-black w-[18rem] lg:w-[24rem]">
        //             <div className="p-5 bg-black text-white border-b-2 border-black text-center font-bold text-lg">hello {user["username"]}</div>
        //             <div className="bg-[#FFEBC6] p-5 pb-2 lg:pb-5 flex flex-col gap-y-6">
        //                 <div className="flex flex-col relative">
        //                     <p className="flex items-center p-3 lg:p-5 lg:pt-0 text-xl font-bold">details</p>
        //                     <div className="flex flex-col border-2 border-black p-5 mb-5">
        //                         <p>{user.username}</p>
        //                         <p>{user.email}</p>
        //                         <p>{user.email_updates}</p>
        //                     </div>
        //                     <div className="flex flex flex-col lg:flex-row gap-2 justify-around w-10/12 lg:w-full mx-auto">
        //                         {
        //                             days.map((day, index) => {
        //                                 return (
        //                                     <button key={index} id="index" value={index} onClick={() => setSelectedIndex(index)}
        //                                         className={`cursor-pointer w-10/12 mx-auto ${selectedIndex === index ? "bg-slate-800 font-bold text-white" : ""}`}>
        //                                         {day}
        //                                     </button>
        //                                 )
        //                             })
        //                         }
        //                     </div>
        //                     {
        //                         loading ?
        //                             <LoadingComponent />
        //                             :
        //                             Object.keys(profileSelections).map((elem) => (
        //                                 <div className="">
        //                                     <div key={elem} className={`bg-[#FFEBC6] p-3 grid md:grid-cols-2 max-h-[400px] overflow-auto ${elem == days[selectedIndex] ? "" : "hidden"}`}>
        //                                         {
        //                                             profileSelections[elem].map((item) => (
        //                                                 pattern.test(item['keen']) &&
        //                                                 <div className="px-2">
        //                                                     <div className="relative">
        //                                                         <a
        //                                                             href={item['link']}
        //                                                             id="title"
        //                                                             target="_blank"
        //                                                             rel="noopener noreferrer"
        //                                                             class="w-full font-bold text-center tracking-tight text-brown-800">
        //                                                             <p class="truncate">{item['artist']}</p>
        //                                                         </a>
        //                                                         <img src={item['img']} className="border-2 border-black" alt="" />
        //                                                     </div>
        //                                                 </div>
        //                                             ))
        //                                         }
        //                                     </div>
        //                                 </div>
        //                             ))
        //                     }
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Profile