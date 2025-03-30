 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataAndProcess(url) {
    try {
         
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

         
        let { data } = await response.json();

         
        await delay(1000);

         
        let { name, info: { age, city } } = data;

         
        print(`Name: ${name}, Age: ${age}, City: ${city}`);
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

 
const simulatedURL = 'https://api.example.com/user';

 
fetchDataAndProcess(simulatedURL);

 
