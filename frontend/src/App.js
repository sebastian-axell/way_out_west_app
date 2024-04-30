import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import { Octokit } from "octokit";
import ArtistCard from "./components/artistCard";
import Timer from "./components/timer";
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

function App() {
  const [data, setData] = useState(true);
  const [selectedDay, setSelectedDay] = useState("thursday")
  const numberOfSVGs = 8;

  const getData = async () =>{
    await fetchData().then(response=>{
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
    <div class="bg-pink-200 h-screen overflow-y-auto w-full ">
      <div className="h-16 lg:h-20 absolute z-10 bg-teal-700 w-full" id="header">
        <div className="mx-auto w-fit flex h-full pb-1 justify-center p-2">
            <img src="https://way-out-west-app-backend.vercel.app/media/weoutwest.svg" />
        </div>
      </div>   
      <div className="flex justify-between h-max mt-3">
      <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem] relative hidden lg:block max-h-none overflow-y-clip">
            <div className="rotate-90" >
                <div className="min-w-max flex space-x-7 mt-32" >
                <div className="-rotate-180">
                  <img src="https://way-out-west-app-backend.vercel.app/media/dates.svg" />
                </div>
              </div>
          </div>
        </div>
          <div className="w-full">
            <div className="mt-24 md:mt-24 lg:mt-32 mb-5 md:mb-10 xl:mb-20 w-full flex justify-center">
              {/* sm:w-8/12 lg:w-5/12 xl:w-3/12 */}
              <div className="flex xl:w-6/12 h-14 inline-flex items-center justify-around py-1 md:py-2 text-gray-500 rounded-lg">
                <button value={"thursday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "thursday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6  py-1 hover:-translate-y-1 w-4/12 mx-2 xl:w-fit h-10 xl:h-16`} onClick={()=>{setSelectedDay("thursday")}}><img className="pb-2 h-10 xl:h-16 w-full"  src="https://way-out-west-app-backend.vercel.app/media/thursday.svg" /></button>
                <button value={"friday"} className={`transition-transform rounded-xl rounded transition ${ selectedDay == "friday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6 py-1 hover:-translate-y-1 w-4/12 mx-2 xl:w-fit h-10 xl:h-16`} onClick={()=>{setSelectedDay("friday");}}><img className="h-10 xl:h-16 w-full" src="https://way-out-west-app-backend.vercel.app/media/friday.svg" /></button>
                <button className={`transition-transform rounded-xl transition rounded ${ selectedDay == "saturday" ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6 py-1 hover:-translate-y-1 w-4/12 mx-2 xl:w-fit h-10 xl:h-16`} value={"saturday"} onClick={()=>{setSelectedDay("saturday")}}><img className="pb-2 h-10 xl:h-16 w-full"  src="https://way-out-west-app-backend.vercel.app/media/saturday.svg" /></button>
              </div>
            </div>
          <div class="w-11/12 md:w-10/12 lg:w-10/12 xl:w-9/12 mx-auto">
            <div className="grid grid-cols-2 gap-x-4 xl:gap-x-7 xl:gap-y-12 md:grid-cols-3 xl:grid-cols-4 mb-16">
              {Object.keys(data).map((dataEntry, value) =>(
                data[value]['day'] == selectedDay && <ArtistCard key={value} index={value} updateData={updateData} data={data[value]}/>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-teal-300 bg-opacity-50 w-0/12 lg:w-[5rem] xl:w-[5rem] relative hidden lg:block max-h-none overflow-y-clip">
            <div className="rotate-90" >
                <div className="opacity-75 min-w-max flex space-x-7 mt-32" >
                <img src="https://way-out-west-app-backend.vercel.app/media/gothenburg.svg" />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

              {/* <Timer/> */}
              <svg
      xmlns="http://www.w3.org/2000/svg"
      width="358.364"
      height="64.068"
      version="1.1"
      viewBox="0 0 94.817 16.951"
    >
      <g
        strokeLinecap="round"
        strokeWidth="1.323"
        transform="translate(-55.578 -65.877)"
      >
        <path
          d="M75.077 71.921l-4.608 8.337-2.718.01-1.73-6.198-1.64 6.21-2.718.009-5.039-8.579 5.005-.943 1.488 6.55 1.73-6.562 2.293-3.228 1.848 9.769 1.511-6.56zm7.878 4.769l-6.62.382c.036.562.25.992.644 1.29.397.296.98.444 1.747.44.486 0 .957-.09 1.413-.266.455-.177.815-.366 1.079-.567h.255l.734 4.184c-.52.211-1.736-1.973-2.196-1.877-.46.095-.97.144-1.528.146-1.441.005-2.547-.315-3.316-.96-.77-.646-1.157-1.568-1.161-2.766-.004-1.185.355-2.124 1.077-2.817.727-.698 1.723-1.049 2.99-1.053 1.167-.004 2.047.289 2.637.88.59.586.888 1.433.892 2.542zm-3.645-.978c-.014-.482-.135-.844-.362-1.086-.227-.242-.734 1.455-1.212 1.457-.443.001-.652-1.7-.937-1.469-.284.232-.443.601-.475 1.108z"
          style={{}}
          fill="#fff"
          stroke="#1a1a1a"
          ariaLabel="We"
        ></path>
        <path
          d="M94.21 74.676c.005 1.518-.426 2.726-1.292 3.625-.867.894-2.068 1.343-3.603 1.349-1.53.005-4.653.057-5.526-.83-.873-.893.61-2.591.604-4.11-.005-1.53.425-2.74 1.292-3.63.866-.894 2.234-.65 3.596-1.349 3.496-1.796 2.728.436 3.605 1.324.877.884 1.318 2.09 1.323 3.621zM90.962 77.1c.238-.291.413-.633.527-1.025.114-.397.17-.862.168-1.395-.002-.571-.07-1.057-.204-1.457-.133-.4-.307-.724-.521-.97a1.934 1.934 0 00-.757-.554 2.309 2.309 0 00-.883-.17 2.354 2.354 0 00-.882.17 2.066 2.066 0 00-.752.552c-.213.24-.386.57-.521.993-.13.418-.195.905-.193 1.459.002.567.067 1.05.197 1.45.133.397.307.72.521.971.214.25.464.435.75.554.286.118.587.177.902.176.316-.001.616-.062.902-.182.285-.125.534-.316.746-.572zm12.165 2.304l-2.302.008-.002-.793a7.021 7.021 0 01-1.168.746c-.353.168-.775.252-1.265.254-.793.003-1.406-.223-1.838-.678-.428-.455-.643-1.127-.646-2.018l-.017-4.675 2.315-.008 1.389 2.082c.2.301-1.363 2.145-1.341 2.388.026.238.082.436.168.594.082.157-.29 1.05-.127 1.123.166.072.89-.672 1.184-.673.196 0 .413-.037.652-.11.238-.074.468-.181.69-.323l-.018-5.09 2.302-.009zm6.766-.088c-.247.065-.51.115-.786.15-.277.04-.616.06-1.017.061-.895.003-1.563-.175-2.003-.536-.437-.361-1.8.195-1.62-.664l.949-4.552-.947.003-.006-1.56.947-.004-.007-2.052 2.302-.009.007 2.053 2.934-1.124-.773 2.677-2.155.008.009 2.545c0 .251.004.47.009.658.006.188.04.356.104.505.06.15.165.268.314.357.154.085.376.127.666.126.12 0 .275-.027.466-.078.196-.052.333-.1.41-.143h.191z"
          style={{}}
          fill="#fff"
          stroke="#1a1a1a"
          ariaLabel="Out"
        ></path>
        <text
          xmlSpace="preserve"
          style={{}}
          x="89.374"
          y="77.827"
          fill="#000"
          fillOpacity="1"
          fontFamily="Sans"
          fontSize="11.289"
          fontWeight="bold"
          transform="rotate(-.2)"
        ></text>
        <path
          d="M126.743 69.886l-1.65 10.89-3.599-1.35-1.73-6.196-1.64 6.209-2.718.01-2.598-9.514 2.565-.01 1.487 6.55 1.73-6.56 3.624-1.845.517 8.385 1.512-6.56zm8.604 6.327l-5.269.018c.036.563.434 2.829.828 3.126.397.297.796-1.392 1.563-1.395.486-.002.957-.09 1.413-.267.455-.176.815-.365 1.079-.567h.255l.007 1.848a8.55 8.55 0 01-1.469.459c-.46.095-.97.144-1.528.146-1.44.005-2.546-.315-3.316-.96-.77-.646-1.156-1.567-1.16-2.766-.006-1.185.354-2.124 1.077-2.817.726-.698 1.723-1.049 2.989-1.053 1.168-.004 2.047.29 2.638.88.59.586 1.608-.494 1.405.596zm-2.294-1.342c-.014-.481-.135-.843-.362-1.086-.226-.242-.579-.362-1.056-.36-.443.001-.808.117-1.092.349-.285.23-.444.6-.476 1.108zm10.164 2.203c.002.742-.328 1.342-.992 1.8-.663.455-1.573.684-2.728.688a7.793 7.793 0 01-1.74-.173c-.52-.118-.939-.248-1.255-.392l-.007-1.893h.211c.115.08.248.169.397.266.154.094.37.195.647.305.24.097.51.182.814.253.302.067.627.1.972.099.452-.002.97 1.894 1.187 1.795.217-.103.142-2.198.141-2.394 0-.175-.065-.3-.193-.377-.128-.08-.372-.157-.73-.228a9.65 9.65 0 00-.698-.119c-.29-.046-.554-.1-.793-.163-.653-.169-1.138-.431-1.455-.788-.316-.362-.476-.81-.478-1.348-.002-.69.322-1.265.973-1.724.655-.462-1.168-2.054-.034-2.058.537-.002 3.769 1.41 4.26 1.52.494.104.88.218 1.158.34l.006 1.817h-.198a4.594 4.594 0 00-1.173-.565 4.053 4.053 0 00-1.324-.219c-.371.001-.684.054-.94.157-.25.103-.376.248-.375.436 0 .17.058.3.174.39.115.089.386.177.813.265.234.046.486.092.755.138.273.042.546.096.819.164.606.155 1.054.403 1.346.743.29.336.437.758.439 1.265zm6.127 2.191c-.247.065-1.17 1.657-1.447 1.692-.277.04.046-1.482-.355-1.48-.896.002-1.563-.177-2.004-.537-.436-.361-.656-.98-.659-1.86l-.011-3.357-.947.004-.006-1.56.947-.004-.007-2.053 2.302-.008.007 2.053 2.449-.999-.289 2.552-2.155.007.854.783c.185.17-.84 2.234-.836 2.421.006.188.04.356.105.505.06.15.165.268.314.357.154.085.376.127.666.126.12 0 .275-.027.466-.079.196-.052.332-.099.41-.142h.19z"
          style={{}}
          fill="#fff"
          stroke="#1a1a1a"
          ariaLabel="West"
        ></path>
      </g>
              </svg>
{/* <div className="flex justify-between">
  <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem] sm:max-w-xs content-center"></div> 
  <div className="w-full"></div>
  <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem]">
    text to be rotated and run alongside the full height of the div but always fit inside the div
  </div>
</div> */}

export default App;
{/* <div className="flex justify-between">
  <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem] sm:max-w-xs content-center"></div> 
  <div className="w-full"></div>
  <div className="bg-teal-300 opacity-50 w-0/12 lg:w-[5rem] xl:w-[6rem]">
      <div className="absolute inset-0 flex items-center justify-center bg-blue-400 overflow-y-clip my-auto">
            <div id="ok">
            </div>
      </div>
  </div>
</div> */}