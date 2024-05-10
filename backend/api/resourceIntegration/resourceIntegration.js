

const GET = "SELECT * FROM performances;";

const PUT = "UPDATE performances SET ? = ? WHERE id = ?";

function generateUpdateQuery(columnName) {
    const query = `UPDATE performances SET ${columnName} = ? WHERE id = ?`;
    
    return query
  }

module.exports = {
    GET,
    PUT,
    generateUpdateQuery
}