import constants from "./constants";

function CreateTimeOutPromise(){
    const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), constants.requestTimeOut));
    return timeoutPromise
}

export default CreateTimeOutPromise;