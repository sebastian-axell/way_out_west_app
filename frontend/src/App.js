import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import { Octokit } from "octokit";
import ArtistCard from "./components/artistCard";
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

async function test(){
  const secretKey = await get_secret();
  let key = secretKey['key'];
  
  const octokit = new Octokit({ 
    auth: decrypt(key, keyHex, ivHex)
  });
  const sha = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'sebastian-axell',
    repo: 'way_out_west',
    path: 'data.csv',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(response => {
    return response['data']['sha'];
  })
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

  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'OWNER',
    repo: 'REPO',
    path: 'PATH',
    message: 'a new commit message',
    committer: {
      name: 'Monalisa Octocat',
      email: 'octocat@github.com'
    },
    content: 'bXkgdXBkYXRlZCBmaWxlIGNvbnRlbnRz',
    sha: '95b966ae1c166bd92f8ae7d1c313e738c731dfc3',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
}

function updateCSVData(data){
  const csvString = Papa.unparse(data);
  const base64Content = btoa(encodeURIComponent(csvString));

}

function App() {
  const [data, setData] = useState(true);
  const [selectedDay, setSelectedDay] = useState("thursday")

  const getData = async () =>{
    await test().then(response=>{
      setData(response)
    })
  }

  const updateData = (index, keenData) => {
    setData(prevItems => {
      const updatedItems = [...prevItems]; // Create a copy of the current array
      updatedItems[index]['keen'] = keenData; // Update the desired index with the new value
      return updatedItems; // Set the updated array back to the state
    });
    updateCSVData(data);
  }

  useEffect(() => {
    getData()
  }, []);
  
  return (
    <div class="bg-pink-200 h-screen overflow-y-auto w-full">
      <div className="h-16 absolute z-10 bg-teal-700 w-full" id="header">
        <img className="mx-auto" src="https://www.wayoutwest.se/wp-content/themes/wayoutwest/assets/img/logo.svg"/>
      </div>   
      <div className="flex justify-between">
        <div className="bg-teal-300 opacity-50 w-1/12 xl:w-[6rem] sm:max-w-xs content-center"></div>   
          <div className="">
            <div className="mt-24 md:mt-28 mb-5 md:mb-10 xl:mb-12 w-full flex justify-center">
              {/* sm:w-8/12 lg:w-5/12 xl:w-3/12 */}
              <div className="flex text-sm  md:text-2xl w-fit space-x-3 md:space-x-8 inline-flex items-center justify-around py-1 md:py-2 px-4 text-gray-500 rounded-lg">
                <button value={"thursday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "thursday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-2 md:px-6 py-1 hover:-translate-y-1`} onClick={()=>{setSelectedDay("thursday")}}>thursday</button>
                <button value={"friday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "friday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-2 md:px-6 py-1 hover:-translate-y-1`} onClick={()=>{setSelectedDay("friday");}}>friday</button>
                <button className={`transition-transform rounded-xl transition rounded ${ selectedDay == "saturday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-2 md:px-6 py-1 hover:-translate-y-1`} value={"saturday"} onClick={()=>{setSelectedDay("saturday")}}>saturday</button>
              </div>
            </div>
          <div class="w-11/12 md:w-9/12 lg:w-10/12 xl:w-11/12 mx-auto">
            <div className="grid grid-cols-2 gap-x-4 lg:gap-x-24 xl:gap-y-24 sm:grid-cols-3 mb-16">
              {Object.keys(data).map((dataEntry, value) =>(
                data[value]['day'] == selectedDay && <ArtistCard key={value} index={value} updateData={updateData} data={data[value]}/>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-teal-300 opacity-50 w-1/12 xl:w-[6rem] sm:max-w-xs content-center"></div>
      </div>
    </div>
  );
}


export default App;
