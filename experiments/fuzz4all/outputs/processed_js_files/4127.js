 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
     
    const data = await response.json();
    
     
    const transformedData = data.results.map(({ name, height, mass }) => ({
      name: name.toUpperCase(),
      bmi: (mass / ((height / 100) ** 2)).toFixed(2),
    }));
    
    return transformedData;
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
function* processData(dataArray) {
  for (const data of dataArray) {
    yield `Character: ${data.name}, BMI: ${data.bmi}`;
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property "${prop}" with value: ${target[prop]}`);
    return target[prop];
  }
};

 
(async () => {
  const url = 'https://swapi.dev/api/people/';
  const data = await fetchData(url);

  const generator = processData(data);
  for (let info of generator) {
    const proxyInfo = new Proxy({ info }, handler);
    print(proxyInfo.info);
  }
})();
