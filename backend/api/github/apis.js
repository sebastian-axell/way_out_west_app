
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
  
  async function putUpdatedCsvData(octokit, base64Content, sha) {
      return await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: 'sebastian-axell',
          repo: 'way_out_west',
          path: 'data.csv',
          message: 'updated keens',
          committer: {
              name: 'BackEndKeenModifier',
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

  module.exports = {
    get_sha,
    putUpdatedCsvData,
    getCsvBlob
  }