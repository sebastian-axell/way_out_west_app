import React from 'react';
import { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import svgIcons from "./svgIcon";

function ProfileModule({
    children,
    data,
    setSelectedIndex,
    selectedIndex,
    loading
}) {
    // const pattern = new RegExp(`${user.username}-.*`);
    const { user, isAuthenticated } = useAuth();

    const LoadingComponent = () => (
        <div className="mx-auto my-auto w-fit animate-logo">
            {svgIcons.loading}
        </div>
    );

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
        <div className="flex justify-center items-center h-full">
            <div className="border-2 border-black w-[18rem] lg:w-[24rem]">
                <div className="p-5 bg-black text-white border-b-2 border-black text-center font-bold text-lg">{isAuthenticated ? "hello " + user.username : "login"}</div>
                <div className="bg-[#FFEBC6] p-5 pb-2 lg:pb-5 flex flex-col gap-y-6">
                    <div className="flex flex-col gap-3">
                        {/* {
                            isAuthenticated ?
                                <div>
                                    <p className='text-center border-b-0 border-2 border-black w-fit mx-auto p-1 px-2 rounded-lg rounded-b-none'>details</p>
                                    <div className="flex flex-col border-2 border-black p-5">
                                        <p>{user.username}</p>
                                        <p>{user.email}</p>
                                        <p>{user.email_updates}</p>
                                    </div>
                                </div>
                                :
                                <></>
                        } */}
                        <p className="flex items-center justify-center p-3 pt-1 text-xl font-bold">{isAuthenticated ? "noted interest" : "pick your fighter"}</p>
                        <div className="flex flex flex-col lg:flex-row gap-3 justify-around w-10/12 lg:w-full mx-auto">
                            <div className="flex flex flex-col lg:flex-row gap-2 justify-around w-10/12 lg:w-full mx-auto">
                                {
                                    data.map((elem, index) => {
                                        return (
                                            <button key={index} id="index" value={index} onClick={() => setSelectedIndex(index)}
                                                className={`cursor-pointer w-10/12 mx-auto border-2 border-black ${selectedIndex === index ? "bg-yellow-300 font-bold text-black" : ""}`}>
                                                {elem}
                                            </button>
                                        )
                                    })
                                }
                            </div>
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

export default ProfileModule;
