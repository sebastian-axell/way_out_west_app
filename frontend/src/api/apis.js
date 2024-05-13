import helpers from "../auxiliary/helpers"
import { Octokit } from "octokit";
const Papa = require('papaparse');

const keyHex = process.env.REACT_APP_key_Hex;
const ivHex = process.env.REACT_APP_iv_Hex;

const BASE_URL = "tbd";

const constructUrl = (endpoint) => {
  return `${BASE_URL}/${endpoint}`;
};

const fetchDataNew = async (endpoint) => {
    const requestOptions = configureRequestOptions();
    const url = constructUrl(endpoint);
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const putUpdate = async (endpoint, data) => {
    const requestOptions = configureRequestOptions("PUT", data);
    const url = constructUrl(endpoint);
    console.log(requestOptions);
    try{
        let data = await fetch(url, requestOptions).then(response =>{
            return response.json()
        });
        return data;
    } catch (error){
        throw new Error('Failed to update data: ' + error.message);
    }
}

function configureRequestOptions(method, data) {
    let apiKey = process.env.REACT_APP_api_Key;
    let encryptedAPIKey = helpers.encrypt(apiKey, keyHex, ivHex);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${encryptedAPIKey}`);
    myHeaders.append('Content-Type', 'application/json')

    let requestMethod;
    method ? requestMethod = method : requestMethod = 'GET';


    const requestOptions = {
        mode: 'cors',
        method: requestMethod,
        headers: myHeaders,
        redirect: "follow"

    };
    
    if (requestMethod !== 'GET') {
        requestOptions.body = JSON.stringify({"data": data, "type": "keen"});
      }

    return requestOptions;
}

async function createOctokit() {
    const secretKey = await get_secret();

    let key = secretKey['key'];

    const octokit = new Octokit({
        auth: helpers.decrypt(key, keyHex, ivHex)
    });
    return octokit;
}

async function get_secret(){
  const requestOptions = configureRequestOptions();
  
  let data = await fetch("https://way-out-west-app-backend.vercel.app/protected", requestOptions)
    .then(response => response.json())
  return data;
}

async function get_sha(octokit){

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
    try{
        const octokit = await createOctokit();
        
        const sha = await get_sha(octokit);
        
        const csv_data = await getCsvBlob(octokit, sha);

        let cvsData = helpers.processCsvData(csv_data);
        
        return cvsData;
    } 
    catch (error){
        throw new Error('Failed to fetch data: ' + error.message);
    }
}

async function uploadCSV(base64Content){

    const octokit = await createOctokit();

    const sha = await get_sha(octokit)

    const updateResponse = await putUpdatedCsvData(octokit, base64Content, sha)

    return updateResponse['status']

}


async function updateCSVData(data){
    try{
        const csvString = Papa.unparse(data);

        const blob = new Blob([csvString], { type: 'text/csv' });

        let content = await helpers.toBase64(blob);

        content = content.replace(/^data:.+;base64,/, '');

        const status = await uploadCSV(content);
        
        return status;
    }
    catch (error) {
        throw new Error('Failed to update csv: ' + error.message);
    }
}

async function fetchSvgData(){
    const baseURL = "https://way-out-west-app-backend.vercel.app/media/";
    const svgData = {};
    const endpoints = ["thursday.svg", "friday.svg", "saturday.svg", "weoutwest.svg", "dates.svg", "gothenburg.svg"]
    try {
        for (const endpoint of endpoints) {
        const response = await fetch(`${baseURL}${endpoint}`);
        const svg = await response.text(); 

        const filename = endpoint.split('/').pop().replace('.svg', '');

        svgData[filename] = svg;
        }
        return svgData
    } catch (error) {
        throw new Error('Failed to fetch svgs: ' + error.message);
    }
};

async function putUpdatedCsvData(octokit, base64Content, sha) {
    return await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'sebastian-axell',
        repo: 'way_out_west',
        path: 'data.csv',
        message: 'updated keens',
        committer: {
            name: 'FrontEndKeenModifier',
            email: 'na'
        },
        content: base64Content,
        sha: sha,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then(response => {
        return response;
    });
}

async function getCsvBlob(octokit, sha) {
    return await octokit.request('GET /repos/{owner}/{repo}/git/blobs/{file_sha}', {
        owner: 'sebastian-axell',
        repo: 'way_out_west',
        file_sha: sha,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    }).then(response => {
        return response['data'];
    });
}

export default {fetchData, fetchSvgData, updateCSVData, fetchDataNew, putUpdate};