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


function App() {
  const [data, setData] = useState(false);
  const [selectedDay, setSelectedDay] = useState("thursday")
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [inProgress, setInProgress] = useState(false)
  const [failed, setFailed] = useState(false)

  const numberOfSVGs = 8;

  const updateData = async (index, keenData) => {
    setData(prevItems => {
      const updatedItems = [...prevItems]; 
      updatedItems[index]['keen'] = keenData; 
      return updatedItems;
    });

    setInProgress(true);

    // let response = apis.putUpdate("data/" + (index + 1), keenData);
    // console.log(await response);

    let status = await apis.updateCSVData(data).then(response => {
      if (response === 200){
        // should set the data here
        setInProgress(false);
        setUpdateComplete(true);
        return "ok";
      } else {
        setInProgress(false);
        setUpdateFailed(true);
        return "bad";
      }
    })
    .catch(error =>{
      console.log("error:", error)
      return "bad";
    })
    return status;
  }

  useEffect(() => {
    Promise.all([apis.fetchData(), apis.fetchSvgData()])
      .then(([dataResponse, svgResponse]) => {
        setData(dataResponse);
        setSvgData(svgResponse);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error:", error);
        setFailed(true);
      });
  }, []);

  
  // useEffect(()=>{
  //   const fetchDataFromApi = async () => {
  //     try {
  //       const result = await apis.fetchDataNew("data");
  //       console.log(result);
  //     } catch (error) {
  //       // Handle error
  //     }
  //   };
  //   fetchDataFromApi();
  // })


  useEffect(() => {
    if (isUpdateComplete) {
      setTimeout(() => {
        setUpdateComplete(false);
      }, 2000); 
    }
  }, [isUpdateComplete]);

  useEffect(() => {
    if (updateFailed) {
      setTimeout(() => {
        setUpdateFailed(false);
      }, 2000); 
    }
  }, [updateFailed]);
  

  
  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ? (
          failed ? <ResponseEmoji emoji={'🥲'} refreshButton={true}/> : <Spinner />
        ) : (
          <div className="fade-in">
            <div className="h-16 lg:h-20 absolute top-0 z-10 bg-cyan-600 w-full" id="header">
              <div className="mx-auto w-fit flex h-full pb-1 justify-center p-2">
                  <img src={`data:image/svg+xml;base64,${btoa(svgData['weoutwest'])}`} />
              </div>
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