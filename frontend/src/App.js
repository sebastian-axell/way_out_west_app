import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import { Octokit } from "octokit";
import ArtistCard from "./components/artistCard";
import Timer from "./components/timer";
import Spinner from "./components/spinner";
const CryptoJS = require('crypto-js');
const Papa = require('papaparse');

function encrypt(text, keyHex, ivHex) {
    const key = CryptoJS.enc.Hex.parse(keyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function decrypt(encryptedText, keyHex, ivHex) {
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encryptedTextBytes = CryptoJS.enc.Hex.parse(encryptedText);
  
  const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedTextBytes },
      key,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const keyHex = '01eda8f0bcae94a569139c6126dd5d2929863500de660b3f6414d0b4c9cc3770'; // 256-bit 
const ivHex = 'b22ec2381daab4d862d5c76ab07c00d8'; // 128-bit 

async function get_secret(){
  let apiKey = "E78j6jYcHFMz6miZXvmdoVdbW5ywhB9JunEfD980pK0="
  let encryptedAPIKey = encrypt(apiKey, keyHex, ivHex)
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${encryptedAPIKey}`);

  const requestOptions = {
    mode: 'cors',
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  let data = await fetch("https://way-out-west-app-backend.vercel.app/protected", requestOptions)
  .then(response => response.json())
  .then(data => {return data;})
  .catch(error => console.error(error));
  return data;
}

async function get_sha(){
  const secretKey = await get_secret();
  let key = secretKey['key'];
  
  const octokit = new Octokit({ 
    auth: decrypt(key, keyHex, ivHex)
  });

  return await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'sebastian-axell',
    repo: 'way_out_west',
    path: 'data.csv',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(response => {
    return response['data']['sha'];
  })
}

async function fetchData(){
  const secretKey = await get_secret();
  let key = secretKey['key'];
  
  const octokit = new Octokit({ 
    auth: decrypt(key, keyHex, ivHex)
  });

  const sha = await get_sha();

  const csv_data = await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
    owner: 'sebastian-axell',
    repo: 'way_out_west',
    file_sha: sha,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(response=> {
    return response['data'];
  });
  const decodedString = atob(csv_data['content']);
      const lines = decodedString.split("\n");
      const dataArray = lines.map(line => {
        const decodedLine = decodeURIComponent(escape(line.trim())); 
        return decodedLine;
      }).join('\n')
      const parsedData = Papa.parse(dataArray.trim(), { header: true }).data;
      console.log(parsedData);
      return parsedData;
}

async function uploadCSV(base64Content){
  const secretKey = await get_secret();
  let key = secretKey['key'];
  
  const octokit = new Octokit({ 
    auth: decrypt(key, keyHex, ivHex)
  });

  const updateResponse = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'sebastian-axell',
    repo: 'way_out_west',
    path: 'data.csv',
    message: 'updated keens',
    committer: {
      name: 'FrontEndKeenModifier',
      email: 'na'
    },
    content: base64Content,
    sha: await get_sha(),
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(response =>{
    return response;
  })
  console.log(updateResponse);
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

async function updateCSVData(data){
  const csvString = Papa.unparse(data);
  const blob = new Blob([csvString], { type: 'text/csv' });
  let content = await toBase64(blob);
  content = content.replace(/^data:.+;base64,/, '');
  uploadCSV(content);
}

async function fetchSvgData(){
  // Define an async function to fetch SVG data from the provided URLs
  const baseURL = "https://way-out-west-app-backend.vercel.app/media/";
  const svgData = {};
  const endpoints = ["thursday.svg", "friday.svg", "saturday.svg", "weoutwest.svg", "dates.svg", "gothenburg.svg"]
  try {
    // Loop through each endpoint in the array
    for (const endpoint of endpoints) {
      // Fetch SVG data from the current endpoint
      const response = await fetch(`${baseURL}${endpoint}`);
      const svg = await response.text(); // Convert response to text

      // Extract the filename from the endpoint (e.g., '/media/thursday.svg' => 'thursday')
      const filename = endpoint.split('/').pop().replace('.svg', '');

      // Store SVG data in the object with the filename as the key
      svgData[filename] = svg;
    }
    return svgData
  } catch (error) {
    console.error('Error fetching SVG data:', error);
  }
};


function App() {
  const [data, setData] = useState(true);
  const [selectedDay, setSelectedDay] = useState("thursday")
  const [loading, setLoading] = useState(true)
  const [svgData, setSvgData] = useState(null);

  const numberOfSVGs = 8;


  const updateData = (index, keenData) => {
    if (keenData != data[index]['keen']){
      setData(prevItems => {
        const updatedItems = [...prevItems]; // Create a copy of the current array
        updatedItems[index]['keen'] = keenData; // Update the desired index with the new value
        return updatedItems; // Set the updated array back to the state
      });
      updateCSVData(data);
    }
  }

  useEffect(() => {
    fetchData().then(response=>{
      setData(response)

      if (svgData) setLoading(false);
    })

    fetchSvgData().then(response=>{
      setSvgData(response)

      if (data) setLoading(false)
    })
  }, []);

  

  
  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      {/* bg-blue-100 */}
      {
        loading ? (
          <Spinner />
        ) :
        (
          <div className="">
          <div className="h-16 lg:h-20 absolute top-0 z-10 bg-teal-700 w-full" id="header">
            <div className="mx-auto w-fit flex h-full pb-1 justify-center p-2">
                <img src={`data:image/svg+xml;base64,${btoa(svgData['weoutwest'])}`} />
            </div>
          </div>   
          <div className="flex justify-between h-max mt-3">
          <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem] relative hidden lg:block max-h-none overflow-y-clip">
                <div className="rotate-90" >
                    <div className="min-w-max flex space-x-7 mt-32" >
                    <div className="-rotate-180">
                      <img src={`data:image/svg+xml;base64,${btoa(svgData['dates'])}`} />
                    </div>
                  </div>
              </div>
            </div>
              <div className="w-full">
                <div className="mt-24 md:mt-24 lg:mt-32 mb-5 md:mb-10 xl:mb-12 2xl:mb-16 w-full flex justify-center">
                  {/* sm:w-8/12 lg:w-5/12 xl:w-3/12 */}
                  <div className="flex xl:w-6/12 h-14 inline-flex items-center justify-around py-1 md:py-2 text-gray-500 rounded-lg">
                    <button value={"thursday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "thursday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6  py-1 hover:-translate-y-1 w-3/12 md:w-4/12 mx-2 xl:w-fit md:h-10 xl:h-14`} onClick={()=>{setSelectedDay("thursday")}}><img className="pb-0.5 md:h-10 xl:h-12 w-full"  src={`data:image/svg+xml;base64,${btoa(svgData['thursday'])}`} /></button>
                    <button value={"friday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "friday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6 py-1 hover:-translate-y-1 w-3/12 md:w-4/12 mx-2 xl:w-fit md:h-10 xl:h-14`} onClick={()=>{setSelectedDay("friday");}}><img className="md:h-10 xl:h-14 w-8/12 lg:w-full mx-auto" src={`data:image/svg+xml;base64,${btoa(svgData['friday'])}`} /></button>
                    <button className={`transition-transform rounded-xl transition rounded ${ selectedDay == "saturday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6 py-1 hover:-translate-y-1 w-3/12 md:w-4/12 mx-2 xl:w-fit md:h-10 xl:h-14`} value={"saturday"} onClick={()=>{setSelectedDay("saturday")}}><img className="pb-0.5 md:h-10 xl:h-12 w-full"  src={`data:image/svg+xml;base64,${btoa(svgData['saturday'])}`} /></button>
                  </div>
                </div>
              <div class="w-11/12 md:w-10/12 lg:w-10/12 xl:w-11/12 3xl:w-9/12 mx-auto">
                <div className="grid grid-cols-2 gap-x-4 xl:gap-x-7 xl:gap-y-12 lg:grid-cols-3 2xl:grid-cols-4 mb-16">
                  {Object.keys(data).map((dataEntry, value) =>(
                    data[value]['day'] == selectedDay && <ArtistCard key={value} index={value} updateData={updateData} data={data[value]}/>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-teal-300 bg-opacity-50 w-0/12 lg:w-[5rem] xl:w-[5rem] relative hidden lg:block max-h-none overflow-y-clip">
                <div className="rotate-90" >
                    <div className="opacity-75 min-w-max flex space-x-7 mt-32" >
                    <img src={`data:image/svg+xml;base64,${btoa(svgData['gothenburg'])}`} />
                  </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
    </div>
  );
}
export default App;