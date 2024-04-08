import logo from './logo.svg';
import './App.css';
import { Octokit } from "octokit";


async function test(){
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
