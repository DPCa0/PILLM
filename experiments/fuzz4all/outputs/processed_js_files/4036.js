 
const logHandler = {
  get(target, property) {
    print(`Property '${property}' accessed.`);
    return Reflect.get(target, property);
  }
};

 
const config = new Proxy({
  apiUrl: 'https://api.example.com',
  timeout: 5000
}, logHandler);

 
async function fetchData(endpoint) {
  try {
    const response = await fetch(`${config.apiUrl}/${endpoint}`, {
      method: 'GET',
      timeout: config.timeout
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    print('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  const data = await fetchData('someEndpoint');
  if (data) {
    print('Data processing complete.');
  }
})();
