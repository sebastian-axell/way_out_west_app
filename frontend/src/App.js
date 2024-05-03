import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import ArtistCard from "./components/artistCard";
import Timer from "./components/timer";
import Spinner from "./components/spinner";
import DayButton from "./components/dayButton";
import SideColumn from "./components/sideColumn";
import apis from "./api/apis"


function App() {
  const [data, setData] = useState(true);
  const [selectedDay, setSelectedDay] = useState("thursday")
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [inProgress, setInProgress] = useState(false)

  const numberOfSVGs = 8;

  const updateData = async (index, keenData) => {
    setData(prevItems => {
      const updatedItems = [...prevItems]; // Create a copy of the current array
      updatedItems[index]['keen'] = keenData; // Update the desired index with the new value
      return updatedItems; // Set the updated array back to the state
    });
    setInProgress(true)
    const result = await apis.updateCSVData(data);
    if (result === 200){
      setInProgress(false)
      setUpdateComplete(true);
    }
  }

  useEffect(() => {
    apis.fetchData().then(response=>{
      setData(response)

      if (svgData) setLoading(false);
    })

    apis.fetchSvgData().then(response=>{
      setSvgData(response)

      if (data) setLoading(false)
    })
  }, []);


  useEffect(() => {
    if (isUpdateComplete) {
      setTimeout(() => {
        setUpdateComplete(false);
      }, 2000); 
    }
  }, [isUpdateComplete]);
  

  
  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ? (
          <Spinner />
        ) :
        (
          <div className="fade-in">
            <div className="h-16 lg:h-20 absolute top-0 z-10 bg-cyan-600 w-full" id="header">
              <div className="mx-auto w-fit flex h-full pb-1 justify-center p-2">
                  <img src={`data:image/svg+xml;base64,${btoa(svgData['weoutwest'])}`} />
              </div>
            </div>   
            <div className="flex justify-between h-max mt-3">
              <SideColumn svg={btoa(svgData['dates'])} type={"dates"} repeatTimes={numberOfSVGs} />
              <div className="w-full">
                <div className="mt-24 md:mt-24 lg:mt-32 mb-5 md:mb-10 xl:mb-12 2xl:mb-16 w-full flex justify-center">
                  <div className="flex xl:w-6/12 items-center w-11/12 md:w-9/12 justify-around py-1 md:py-2">
                    <DayButton handleOnclick={setSelectedDay} day={"thursday"} svgData={svgData} selectedDay={selectedDay} />
                    <DayButton handleOnclick={setSelectedDay} day={"friday"} svgData={svgData} selectedDay={selectedDay} />
                    <DayButton handleOnclick={setSelectedDay} day={"saturday"} svgData={svgData} selectedDay={selectedDay} />
                  </div>
                </div>
              <div class="w-11/12 md:w-10/12 lg:w-10/12 xl:w-11/12 3xl:w-9/12 mx-auto">
                <div className="grid grid-cols-2 gap-x-4 xl:gap-x-7 xl:gap-y-12 lg:grid-cols-3 2xl:grid-cols-4 mb-16">
                  {Object.keys(data).map((dataEntry, value) =>(
                    data[value]['day'] == selectedDay && <ArtistCard key={value} index={value} updateData={updateData} data={data[value]} updateKeenComplete={isUpdateComplete} inProgress={inProgress}/>
                  ))}
                </div>
              </div>
              </div>
              <SideColumn svg={btoa(svgData['gothenburg'])} repeatTimes={numberOfSVGs}/>
            </div>
          </div>
        )
      }
    </div>
  );
}
export default App;