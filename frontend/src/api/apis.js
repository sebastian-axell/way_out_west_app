import { Octokit } from "octokit";
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

export default {fetchData, fetchSvgData, updateCSVData};