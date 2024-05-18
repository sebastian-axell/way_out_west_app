import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import ArtistCard from "./components/artistCard";
import Timer from "./components/timer";
import Spinner from "./components/spinner";
import DayButton from "./components/dayButton";
import SideColumn from "./components/sideColumn";
import apis from "./api/apis"
import ResponseEmoji from "./components/responseEmojis";
import constants from "./auxiliary/constants";
import TimeOutHook from "./components/timeOutHook";
import CreateTimeOutPromise from "./auxiliary/timeOutPromise";

function App() {
  const [data, setData] = useState(false);
  const [selectedDay, setSelectedDay] = useState("thursday")
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [timeoutErrorMain, setTimeoutErrorMain] = useState(false);
  const [failed, setFailed] = useState(false)
  const [openHeaderMenu, setOpenHeaderMenu] = useState(false)

  const numberOfSVGs = 8;

  const updateData = async (index, keenData) => {
    try{
      setData(prevItems => {
        const updatedItems = [...prevItems]; 
        updatedItems[index]['keen'] = keenData; 
        return updatedItems;
      });

      setInProgress(true);
      let url = constants.mode == "csv" ? "updateCsvData" : "data/" + (index + 1);
      let content = constants.mode == "csv" ? data : keenData;

      let status = await Promise.race([
        apis.putUpdate(url, content),
        CreateTimeOutPromise(),
      ]);
      
      if (status === 200){
        setInProgress(false);
        setUpdateComplete(true);
        return "ok";
      } else {
        setInProgress(false);
        setUpdateFailed(true);
        return "bad";
      }
    } catch (error){
      setInProgress(false);
      if (error.message == "Request timed out"){
        setTimeoutError(true);
      } else {
        setUpdateFailed(true);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try{
        const dataPromise = apis.fetchData(constants.mode == "csv" ? "csvData" : "data");
        const svgDataPromise = apis.fetchSvgData();
        const [dataResponse, svgResponse] = await Promise.race([Promise.all([dataPromise, svgDataPromise]), CreateTimeOutPromise()]);
        setData(dataResponse);
        setSvgData(svgResponse);
        setLoading(false);
      } catch(error) {
        setFailed(true);
        if (error.message == "Request timed out"){
          setTimeoutErrorMain(true);
        }
        console.log("Error:", error);
        };
      }
    fetchData();
  }, []);
     
    TimeOutHook(timeoutError, setTimeoutError, constants.emojiTimeOut);
    TimeOutHook(isUpdateComplete, setUpdateComplete, constants.emojiTimeOut);
    TimeOutHook(updateFailed, setUpdateFailed, constants.emojiTimeOut);

  
  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ? (
          failed ? <ResponseEmoji emoji={timeoutErrorMain ? '⏲️' : '🥲'} refreshButton={true}/> : <Spinner />
        ) : (
          <div className="fade-in">
            <div className="h-16 lg:h-20 fixed top-0 z-10 bg-cyan-600 w-full" id="header">
              <div className="mx-auto w-fit flex h-full pb-1.5 justify-around p-2 relative">
                  <img className="" src={`data:image/svg+xml;base64,${btoa(svgData['weoutwest'])}`} />
              </div>
              {/* <div className="hidden md:block absolute top-0 h-full flex w-1/3 bg-red-200">
                <button className="h-full flex items-center w-full justify-center pr-20">relative</button>
              </div> */}
              {/* <div className="w-full flex flex-col justify-center md:hidden transition-all">
                <div className="w-[70px] text-sm mx-auto bg-cyan-600 px-2 rounded-b-lg border-white border-l border-b border-r">
                  <div className={`transition-opacity duration-300 ${openHeaderMenu ? 'opacity-100' : 'opacity-0 hidden'}`}>
                    <div className="flex justify-center">option1</div>
                    <div className="flex justify-center">option1</div>
                    <div className="flex justify-center">option1</div>
                  </div>
                  <button className="flex w-full justify-center focus:border-green-200" onClick={()=>setOpenHeaderMenu(!openHeaderMenu)}>
                    {
                      openHeaderMenu ?
                      <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                      </svg>
                    : 
                      <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                      </svg>
                    }
                  </button>
                </div>
              </div> */}
            </div>   
            <div className="flex justify-between h-max mt-3">
              <SideColumn svg={btoa(svgData['dates'])} type={"dates"} repeatTimes={numberOfSVGs} />
              <div className="w-full">
                <div className="mt-20
                 lg:mt-24 mb-5 w-full flex justify-center">
                  <div className="flex xl:w-6/12 items-center w-11/12 md:w-9/12 justify-around py-1 md:py-2">
                    <DayButton handleOnclick={setSelectedDay} day={"thursday"} svgData={svgData} selectedDay={selectedDay} />
                    <DayButton handleOnclick={setSelectedDay} day={"friday"} svgData={svgData} selectedDay={selectedDay} />
                    <DayButton handleOnclick={setSelectedDay} day={"saturday"} svgData={svgData} selectedDay={selectedDay} />
                  </div>
                </div>
              <div class="w-11/12 md:w-10/12 lg:w-10/12 xl:w-11/12 3xl:w-9/12 mx-auto">
                <div className="grid grid-cols-2 gap-x-4 xl:gap-x-7 xl:gap-y-12 lg:grid-cols-3 2xl:grid-cols-4 mb-16">
                  {Object.keys(data).map((dataEntry, value) =>(
                    data[value]['day'] == selectedDay && 
                    <ArtistCard 
                    key={data[value]['artist']} 
                    index={value} 
                    updateData={updateData} 
                    data={data[value]} 
                    updateKeenComplete={isUpdateComplete} 
                    inProgress={inProgress}
                    updateFailed={updateFailed}
                    timedOut={timeoutError}
                    />
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