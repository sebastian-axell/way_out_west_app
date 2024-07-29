import DayButton from "./dayButton";
import ArtistCard from "./artistCard";
import { useState } from "react";


function Home({
  svgData,
  visible,
  data
}) {
  const [selectedDay, setSelectedDay] = useState("thursday")

  return (
    <div className="flex relative">
      <div className="w-full">
        <div className="mt-24 mb-2 md:mb-5 w-full flex justify-center">
          <div className="flex xl:w-6/12 items-center w-11/12 md:w-9/12 justify-around py-1 md:py-2">
            <DayButton key={"thursday"} handleOnclick={setSelectedDay} day={"thursday"} svgData={svgData} selectedDay={selectedDay} />
            <DayButton key={"friday"} handleOnclick={setSelectedDay} day={"friday"} svgData={svgData} selectedDay={selectedDay} />
            <DayButton key={"saturday"} handleOnclick={setSelectedDay} day={"saturday"} svgData={svgData} selectedDay={selectedDay} />
          </div>
        </div>
        <div class="mx-auto w-10/12 relative">
          {
            Object.keys(data).map((elem) => (
              <div
                key={elem}
                className={`${elem == selectedDay
                  ? "grid grid-cols-1 md:grid-cols-2 gap-x-4 xl:gap-x-7 gap-y-7 xl:grid-cols-3 3xl:grid-cols-4 mb-9"
                  :
                  "hidden"
                  }
                    `}>
                {
                  data[elem].map((item, index) => (
                    <ArtistCard
                      key={item['link']}
                      index={index}
                      artistData={item}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
      <div className={`flex items-center justify-center py-1 md:py-2 bg-pink-50 bg-opacity-50 w-fit rounded-lg fixed inset-x-0 mx-auto bottom-0 ${visible ? "" : "hidden"}`}>
        <DayButton key={"thursday"} handleOnclick={setSelectedDay} day={"thursday"} svgData={svgData} selectedDay={selectedDay} />
        <DayButton key={"friday"} handleOnclick={setSelectedDay} day={"friday"} svgData={svgData} selectedDay={selectedDay} />
        <DayButton key={"saturday"} handleOnclick={setSelectedDay} day={"saturday"} svgData={svgData} selectedDay={selectedDay} />
      </div>
    </div>
  )
}
export default Home;