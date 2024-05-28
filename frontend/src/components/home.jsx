import React, { useEffect } from "react";
import { useState } from "react";
import DayButton from "./dayButton";
import ArtistCard from "./artistCard";

function Home({
  data,
  svgData,
  updateData,
  isUpdateComplete,
  inProgress,
  updateFailed,
  timeoutError,
}) {
  const [selectedDay, setSelectedDay] = useState("thursday")
  return (
    <div className="flex">
      <div className="w-full">
        <div className="mt-24 mb-2 md:mb-5 w-full flex justify-center">
          <div className="flex xl:w-6/12 items-center w-11/12 md:w-9/12 justify-around py-1 md:py-2">
            <DayButton handleOnclick={setSelectedDay} day={"thursday"} svgData={svgData} selectedDay={selectedDay} />
            <DayButton handleOnclick={setSelectedDay} day={"friday"} svgData={svgData} selectedDay={selectedDay} />
            <DayButton handleOnclick={setSelectedDay} day={"saturday"} svgData={svgData} selectedDay={selectedDay} />
          </div>
        </div>
        <div class="mx-auto w-10/12 3xl:w-full">
          {
            Object.keys(data).map((elem) => (
              <div className={`${elem == selectedDay
                ? "grid grid-cols-1 md:grid-cols-2 gap-x-4 xl:gap-x-7 gap-y-7 xl:grid-cols-4 mb-9"
                :
                "hidden"
                }
                    `}>
                {data[elem].map((item, index) => (
                  <ArtistCard
                    key={item['artist']}
                    index={index}
                    updateData={updateData}
                    data={item}
                    updateKeenComplete={isUpdateComplete}
                    inProgress={inProgress}
                    updateFailed={updateFailed}
                    timedOut={timeoutError}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default Home;