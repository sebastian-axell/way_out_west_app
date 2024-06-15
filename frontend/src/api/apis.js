import helpers from "../auxiliary/helpers"

const keyHex = process.env.REACT_APP_key_Hex;
const ivHex = process.env.REACT_APP_iv_Hex;

const BASE_URL = process.env.REACT_APP_env == "local" ? process.env.REACT_APP_localhost : process.env.REACT_APP_backend;

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

const login = async (endpoint, data) => {
    const requestOptions = configureRequestOptions("POST", data);
    const url = constructUrl(endpoint);
    try {
        let data = await fetch(url, requestOptions).then(response => {
            console.log(response);
            return response
        });
        return data;
    } catch (error) {
        throw new Error('Failed to update data: ' + error.message);
    }
}

const user = async (endpoint) => {
    const requestOptions = configureRequestOptions("GET");
    const url = constructUrl(endpoint);
    try {
        let data = await fetch(url, requestOptions).then(response => {
            return response.json()
        });
        return data;
    } catch (error) {
        throw new Error('Failed to update data: ' + error.message);
    }
}

const putUpdate = async (endpoint, data) => {
    const requestOptions = configureRequestOptions("PUT", data);
    const url = constructUrl(endpoint);
    try {
        let data = await fetch(url, requestOptions).then(response => {
            return response
        });
        return data;
    } catch (error) {
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
        redirect: "follow",
        credentials: "include" // includes the cookies send from the backend
    };

    if (requestMethod !== 'GET') {
        requestOptions.body = JSON.stringify({ "data": data });
    }

    return requestOptions;
}

async function fetchSvgData() {
    const url = constructUrl("media/");
    const svgData = {};
    const endpoints = ["thursday.svg", "friday.svg", "saturday.svg"]
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

export default { fetchSvgData, fetchData, putUpdate, login, user };