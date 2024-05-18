import helpers from "../auxiliary/helpers"
import constants from "../auxiliary/constants";

const keyHex = process.env.REACT_APP_key_Hex;
const ivHex = process.env.REACT_APP_iv_Hex;

const BASE_URL = "https://way-out-west-app-backend.vercel.app";
// const BASE_URL = "http://localhost:4040";

const constructUrl = (endpoint) => {
  return `${BASE_URL}/${endpoint}`;
};

const fetchData = async (endpoint) => {
    const requestOptions = configureRequestOptions();
    const url = constructUrl(endpoint);
    try {
        const response = await fetch(url, requestOptions);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const putUpdate = async (endpoint, data) => {
    const requestOptions = configureRequestOptions("PUT", data);
    const url = constructUrl(endpoint);
    try{
        let data = await fetch(url, requestOptions).then(response =>{
            return response['status']
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
        requestOptions.body = JSON.stringify({"data": data});
      }

    return requestOptions;
}

async function fetchSvgData(){
    const url = constructUrl("media/");
    const svgData = {};
    const endpoints = ["thursday.svg", "friday.svg", "saturday.svg", "weoutwest.svg", "dates.svg", "gothenburg.svg"]
    try {
        for (const endpoint of endpoints) {
        const response = await fetch(`${url}${endpoint}`);
        const svg = await response.text(); 

        const filename = endpoint.split('/').pop().replace('.svg', '');

        svgData[filename] = svg;
        }
        return svgData
    } catch (error) {
        throw new Error('Failed to fetch svgs: ' + error.message);
    }
};

export default {fetchSvgData, fetchData, putUpdate};