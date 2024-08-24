import React from 'react';
import { useEffect, useContext } from "react";
import { useAuth } from "../authContext";
import LoadingComponent from './loadingComponent';
import { DataContext } from './dataContext';


function ProfileShell({
    children,
    data,
    setSelectedIndex,
    selectedIndex,
    loading,
}) {
    // const { isAuthenticated } = useAuth();
    const [_, isAuthenticated] = useContext(DataContext);
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    navigateDivs("up");
                    break;
                case 'ArrowDown':
                    navigateDivs("down");
                    break;
                case 'ArrowLeft':
                    navigateDivs('left');
                    break;
                case 'ArrowRight':
                    navigateDivs('right');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex]);

    const navigateDivs = (direction) => {
        setSelectedIndex((prevIndex) => {
            if (direction === 'left' || direction === 'up') {
                return prevIndex > 0 ? prevIndex - 1 : data.length - 1;
            } else if (direction === 'right' || direction === 'down') {
                return prevIndex < data.length - 1 ? prevIndex + 1 : 0;
            }
            return prevIndex;
        });
    }
    return (
        <div className="mt-24 lg:mt-40 mb-5">
            <div className="border-2 border-black w-[18rem] lg:w-[24rem]">
                <div className="p-5 bg-black text-white border-b-2 border-black text-center font-bold text-lg">{isAuthenticated ? "hello there" : "login"}</div>
                <div className="bg-[#FFEBC6] p-5 pt-2 pb-2 lg:pb-5 flex flex-col gap-y-6">
                    <div className="flex flex-col gap-3">
                        <p className="flex items-center justify-center p-3 pt-1 text-xl font-bold">{isAuthenticated ? "noted interest" : "pick your fighter"}</p>
                            <div className={`flex gap-2 justify-around w-full mx-auto ${isAuthenticated ? "" : "flex-col"}`}>
                                {
                                    data.map((elem, index) => {
                                        return (
                                            <button key={elem} id="index" value={index} onClick={() => setSelectedIndex(index)}
                                                className={`cursor-pointer w-full lg:w-10/12 mx-auto border-2 border-black ${selectedIndex === index ? "bg-yellow-300 font-bold text-black" : ""}`}>
                                                {elem}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        {
                            loading ?
                                <LoadingComponent />
                                :
                                <main className=''>{children}</main>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileShell;
