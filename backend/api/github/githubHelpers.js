const constants = require("../constants");
const apis = require("./apis")
const Papa = require('papaparse');


async function createOctokit() {
    const { Octokit } = await import('octokit');
    return new Octokit({
        auth: constants.secret_key
    });
}

function processCsvData(csv_data) {
    const decodedString = atob(csv_data);
    const lines = decodedString.split("\n");
    const dataArray = lines.map(line => {
        const decodedLine = decodeURIComponent(escape(line.trim()));
        return decodedLine;
    }).join('\n');
    const parsedData = Papa.parse(dataArray.trim(), { header: true }).data;
    return parsedData;
}

async function fetchData(){
    try{
        const octokit = await createOctokit();
        
        const sha = await apis.get_sha(octokit);
        
        const csv_data = await apis.getCsvBlob(octokit, sha);

        const processed_data = processCsvData(csv_data['content']);
        
        return processed_data;
    } 
    catch (error){
        throw new Error('Failed to fetch data: ' + error.message);
    }
}


async function uploadCSV(csvData){
    try{
        const octokit = await createOctokit();
        const sha = await apis.get_sha(octokit);
        const csvString = Papa.unparse(csvData);
        const buffer = Buffer.from(csvString);
        const base64String = buffer.toString('base64', 'utf-8');
        const updateResponse = await apis.putUpdatedCsvData(octokit, base64String, sha)
        return updateResponse['status']

    } catch (error){
        console.log(error);
        return (error)
    }

}

module.exports = {
    fetchData,
    uploadCSV
}