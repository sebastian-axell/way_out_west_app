import logo from './logo.svg';
import './App.css';
import { Octokit } from "octokit";
const CryptoJS = require('crypto-js');

// Define the encrypt function
function encrypt(text, keyHex, ivHex) {
    // Convert key and iv from hex to WordArray
    const key = CryptoJS.enc.Hex.parse(keyHex);
    const iv = CryptoJS.enc.Hex.parse(ivHex);

    // Encrypt using AES-256-CBC
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });

    // Return the encrypted text as hex
    return encrypted.toString();
}

// Define the decrypt function
function decrypt(encryptedText, keyHex, ivHex) {
  // Convert key and iv from hex to WordArray
  const key = CryptoJS.enc.Hex.parse(keyHex);
  const iv = CryptoJS.enc.Hex.parse(ivHex);

  // Decrypt using AES-256-CBC
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });

  // Return the decrypted text as a string
  return decrypted.toString(CryptoJS.enc.Utf8);
}

const keyHex = '01eda8f0bcae94a569139c6126dd5d2929863500de660b3f6414d0b4c9cc3770'; // 256-bit 
const ivHex = 'b22ec2381daab4d862d5c76ab07c00d8'; // 128-bit 

async function get_secret(){
  let apiKey = "E78j6jYcHFMz6miZXvmdoVdbW5ywhB9JunEfD980pK0="
  let encryptedAPIKey = encrypt(apiKey, keyHex, ivHex)
  console.log(encryptedAPIKey);
  const myHeaders = new Headers();
  myHeaders.append("api-key", encryptedAPIKey);
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  // myHeaders.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
  myHeaders.append('Origin','http://localhost:3000');

  const requestOptions = {
    mode: 'cors',
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("https://way-out-west-app-backend.vercel.app/protected", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}


async function test(){
  let secretKey = await get_secret();

  const octokit = new Octokit({ 
    auth: ""
  });
  const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'sebastian-axell',
    repo: 'way_out_west',
    path: '.',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {get_secret()}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
