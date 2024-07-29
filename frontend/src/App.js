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
  const [visible, setVisible] = useState(false);
  const threshold = [95]; // Height threshold to trigger the visibility

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const bottom = scrollTop + clientHeight >= scrollHeight - 5
      // Check if the user is scrolling up and past the threshold
      if (currentScrollY > threshold && !bottom) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <div className="bg-pink-200 h-full overflow-y-auto w-full">
      {
        loading ?
          (
            <LoadingState failed={failed} timeoutErrorMain={timeoutErrorMain} />
          ) :
          (
            <DataContext.Provider value={[makeUpdate]}>
              <Router>
                <Layout>
                  <Routes>
                    <Route exact path="/" element={<Home svgData={svgData} data={data} visible={visible} />} />
                    <Route path="schedule" element={
                      isAuthenticated ?
                        <Schedule data={data}/>
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