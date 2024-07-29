import Modal from "./modal";
import { useState } from "react";
import { useAuth } from "../authContext";
import InterestedDetails from "./interestedDetails";
import { useNavigate } from "react-router-dom";
import KeenDetails from "./keenDetails";
import svgIcons from "./svgIcon";
import SwipeDots from "./swipeDots";
import { useSwipeable } from 'react-swipeable';
import PerformanceDetails from "./performanceDetails";


export default function ArtistCardDescription({
    index,
    artistData
}) {
    const { isAuthenticated, user } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        isAuthenticated ? (setOpenModal(!openModal)) : navigate("/me")
    }
    const detailsMap = [
        {
            id: 0,
            heading: "details",
            component: <PerformanceDetails stage={artistData['stage']} time={artistData['time']} />
        },
        {
            id: 1,
            heading: "interested",
            component: <KeenDetails
                handleClick={handleClick}
                isAuthenticated={isAuthenticated}
                keenData={artistData['keen']}
            />
        },
    ]
    const goToNext = () => {
        setCurrentPage(prevIndex => (prevIndex + 1) % detailsMap.length);
    }
    const goToPrevious = () => {
        setCurrentPage(prevIndex => (prevIndex - 1 + detailsMap.length) % detailsMap.length);
    }
    const goToIndex = (index) => {
        setCurrentPage(index)
    }
    const detailsHandler = useSwipeable({
        onSwipedLeft: goToNext,
        onSwipedRight: goToPrevious,
        trackMouse: true,
    });
    const renderIcon = () => {
        if (artistData['keen']) {
            const data = artistData['keen'].split(";");
            const userIsPresent = data.some(elem => elem.split("-")[0] === user.username);

            const icon = userIsPresent ? svgIcons.cog : svgIcons.add;

            if (userIsPresent || data.length >= 1) {
                return (
                    <div className="absolute cursor-pointer top-0 md:bottom-0 right-0 p-1 md:p-3 md:pr-2 md:pt-1 text-center w-fit" onClick={handleClick}>
                        <span className="size-8">{icon}</span>
                    </div>
                )
            }
        }

        return <></>;
    };
    return (
        <div class="min-h-[5rem] md:min-h-[6rem] border-t-2 border-black w-full flex flex-col justify-around">
            <div {...detailsHandler} class="font-normal text-gray-700 flex flex-col relative">
                <InterestedDetails component={detailsMap[currentPage]} />
                {
                    isAuthenticated ?
                        renderIcon()
                        :
                        <></>
                }
                <div className="flex justify-around mx-12 text-xl p-1 min-h-[32px]">
                    <div className="flex items-center hidden md:block"><button onClick={goToPrevious}>{svgIcons.leftArrow}</button></div>
                    <SwipeDots activeIndex={currentPage} color={"bg-teal-500"} goToIndexHandler={goToIndex} items={detailsMap} />
                    <div className="flex items-center hidden md:block"><button onClick={goToNext}>{svgIcons.rightArrow}</button></div>
                </div>
            </div>

            {
                openModal &&
                <Modal
                    data={artistData['keen']}
                    artist={artistData['artist']}
                    day={artistData['day']}
                    closeModal={setOpenModal}
                    index={index}
                />
            }
        </div>
    )
}