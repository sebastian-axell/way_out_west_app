import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import './App.css';
import Spinner from "./components/spinner";
import apis from "./api/apis"
import ResponseEmoji from "./components/responseEmojis";
import constants from "./auxiliary/constants";
import CreateTimeOutPromise from "./auxiliary/timeOutPromise";
import Home from "./components/home";
import Schedule from "./components/schedule";
import Layout from "./components/layout";
import Me from "./components/me";
import { useAuth } from "./authContext";
import { DataContext } from "./components/dataContext";

function App() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);
  const [timeoutErrorMain, setTimeoutErrorMain] = useState(false);
  const [failed, setFailed] = useState(false)
  const { isAuthenticated, logout } = useAuth();

  async function makeUpdate(index, keenData, day) {
    const updatedData = { ...data };
    updatedData[day] = [...updatedData[day]];
    updatedData[day][index] = { ...updatedData[day][index], keen: keenData };
    let url = constants.mode == "csv" ? "updateCsvData" : "data/" + (updatedData[day][index]['id']);
    let content = constants.mode == "csv" ? updatedData : keenData;
    let response;
    try {
      let apiResponse = await Promise.race([
        apis.putUpdate(url, content),
        CreateTimeOutPromise(),
      ]);
      let status = apiResponse['status']
      if (status === 200) {
        response = "success"
        setData(updatedData)
      } else if (status === 401) {
        logout();
        response = apiResponse['statusText']
      } else {
        response = "failed"
      }
    } catch (error) {
      response = error.message
    }
    return response
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

  const LoadingState = ({ failed, timeoutErrorMain }) => {
    if (failed) {
      return <ResponseEmoji state={timeoutErrorMain ? "timeout" : "failed"} refreshButton={true} />;
    }
    return <Spinner />;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-pink-200 h-screen overflow-y-auto w-full">
      {
        loading ?
          (
            <LoadingState failed={failed} timeoutErrorMain={timeoutErrorMain} />
          ) :
          (
            <DataContext.Provider value={[data, makeUpdate]}>
              <Router>
                <Layout>
                  <Routes>
                    <Route exact path="/" element={<Home svgData={svgData} />} />
                    <Route path="schedule" element={
                      isAuthenticated ?
                        <Schedule />
                        :
                        <Navigate to={"/me"} />
                    } />
                    <Route path="me" element={
                      <Me data={data} />
                    } />
                    <Route path="*" element={<ResponseEmoji state={"failed"} />} />
                  </Routes>
                </Layout>
              </Router>
            </DataContext.Provider>
          )
      }
    </div>
  )
}
export default App;