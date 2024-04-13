import logo from './logo.svg';
import './App.css';
import { Octokit } from "octokit";
const CryptoJS = require('crypto-js');

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
    path: '.',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(response => {
    return response['data'][0]['sha'];
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
      // Parsing each line and creating an array of objects
      const dataArray = lines.map(line => {
          const decodedLine = decodeURIComponent(escape(line.trim())); 
          return decodedLine;
      });
      console.log(dataArray);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {test()}
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
