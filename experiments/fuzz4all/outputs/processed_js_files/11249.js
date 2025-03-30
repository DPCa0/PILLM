 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  print(`Fetching data from ${url}...`);
  await delay(2000);  
  return { data: `Response from ${url}` };
}

 
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed.`);
    return prop in obj ? obj[prop] : `Property '${prop}' not found`;
  }
};

 
const dataHandler = new Proxy({ name: 'JavaScript', type: 'Programming Language' }, handler);

 
async function process() {
  const url = 'https://api.example.com/data';
  
  try {
    const response = await fetchData(url);
    print(response.data);
    
    print(`Name: ${dataHandler.name}`);
    print(`Type: ${dataHandler.type}`);
    print(`Version: ${dataHandler.version}`);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

process();
