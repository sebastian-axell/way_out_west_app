import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Me from "./components/me";
import { useAuth } from "./authContext";


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
  const { isAuthenticated, logout } = useAuth();

  const updateData = async (index, keenData, day) => {
    const updatedData = { ...data };
    updatedData[day] = [...updatedData[day]];
    updatedData[day][index] = { ...updatedData[day][index], keen: keenData };
    try {
      setInProgress(true);
      let url = constants.mode == "csv" ? "updateCsvData" : "data/" + (updatedData[day][index]['id']);
      let content = constants.mode == "csv" ? updatedData : keenData;

      let response = await Promise.race([
        apis.putUpdate(url, content),
        CreateTimeOutPromise(),
      ]);
      let modalResponse="unsure"
      let status = response['status']
      if (status === 200) {
        setData(updatedData)
        setUpdateComplete(true);
        modalResponse="success"
      }
      else if (status === 401) {
        setUpdateFailed(true);
        logout();
        modalResponse=response['statusText']
      }
      else {
        setUpdateFailed(true);
        modalResponse="failed";
      }
      setInProgress(false);
      return modalResponse
    } catch (error) {
      setInProgress(false);
      if (error.message == "Request timed out") {
        setTimeoutError(true);
      }
      else {
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
    <div className="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ? (
          failed ? <ResponseEmoji state={timeoutErrorMain ? "timeout" : "failed"} refreshButton={true} /> : <Spinner />
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
                  isAuthenticated ?
                  <Schedule
                    data={data}
                    updateData={updateData}
                    isUpdateComplete={isUpdateComplete}
                    inProgress={inProgress}
                    updateFailed={updateFailed}
                    timeoutError={timeoutError}
                  />
                  :
                  <Navigate to={"/me"}/> 
                } />
                <Route path="me" element={
                  <Me data={data} />
                } />
                <Route path="*" element={<ResponseEmoji state={"failed"}/>} />
              </Routes>
            </Layout>
          </Router>
        )
      }
    </div>
  )
}
export default App;