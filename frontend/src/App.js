import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';
import Spinner from "./components/spinner";
import apis from "./api/apis"
import ResponseEmoji from "./components/responseEmojis";
import constants from "./auxiliary/constants";
import TimeOutHook from "./components/timeOutHook";
import CreateTimeOutPromise from "./auxiliary/timeOutPromise";
import Home from "./components/home";
import Schedule from "./components/schedule";
import Layout from "./components/layout";



function App() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);
  const [isUpdateComplete, setUpdateComplete] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);
  const [timeoutErrorMain, setTimeoutErrorMain] = useState(false);
  const [failed, setFailed] = useState(false)

  const updateData = async (index, keenData, day) => {
    try {
      setData(prevData => {
        const updatedData = {... prevData}
        const updatedDayData = [...updatedData[day]];
        updatedDayData[index]['keen'] = keenData;
        updatedData[day] = updatedDayData
        return updatedData;
      });

      setInProgress(true);
      let url = constants.mode == "csv" ? "updateCsvData" : "data/" + (data[day][index]['id']);
      let content = constants.mode == "csv" ? data : keenData;

      let status = await Promise.race([
        apis.putUpdate(url, content),
        CreateTimeOutPromise(),
      ]);

      if (status === 200) {
        setInProgress(false);
        setUpdateComplete(true);
        return "ok";
      } else {
        setInProgress(false);
        setUpdateFailed(true);
        return "bad";
      }
    } catch (error) {
      setInProgress(false);
      if (error.message == "Request timed out") {
        setTimeoutError(true);
      } else {
        setUpdateFailed(true);
      }
    }
  }

  const fetchData = async () => {
    try {
      const dataPromise = apis.fetchData(constants.mode == "csv" ? "csvData" : "data");
      const svgDataPromise = apis.fetchSvgData();
      const [dataResponse, svgResponse] = await Promise.race([Promise.all([dataPromise, svgDataPromise]), CreateTimeOutPromise()]);
      setData(dataResponse);
      setSvgData(svgResponse);
      setLoading(false);
    } catch (error) {
      setFailed(true);
      if (error.message == "Request timed out") {
        setTimeoutErrorMain(true);
      }
      console.log("Error:", error);
    };
  }

  useEffect(() => {
    fetchData();
  }, []);

  TimeOutHook(timeoutError, setTimeoutError, constants.emojiTimeOut);
  TimeOutHook(isUpdateComplete, setUpdateComplete, constants.emojiTimeOut);
  TimeOutHook(updateFailed, setUpdateFailed, constants.emojiTimeOut);

  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ? (
          failed ? <ResponseEmoji emoji={timeoutErrorMain ? '⏲️' : '🥲'} refreshButton={true} /> : <Spinner />
        ) : (
          <Router>
            <Layout>
              <Routes>
                <Route exact path="/" element={
                <Home
                  data={data}
                  svgData={svgData}
                  updateData={updateData}
                  isUpdateComplete={isUpdateComplete}
                  inProgress={inProgress}
                  updateFailed={updateFailed}
                  timeoutError={timeoutError}
                />} />
                <Route path="schedule" element={
                <Schedule
                data={data} 
                updateData={updateData}
                isUpdateComplete={isUpdateComplete}
                inProgress={inProgress}
                updateFailed={updateFailed}
                timeoutError={timeoutError}
                />} />
                <Route path="login" element={<div>hi</div>} />
                <Route path="*" element={<ResponseEmoji emoji={'🥲'} />} />
              </Routes>
            </Layout>
          </Router>
        )
      }
    </div>
  )
}
export default App;