 
import axios from 'axios';

 
async function fetchAndProcessData(url) {
  try {
     
    const response = await axios.get(url);
    const data = response.data;

     
    const { results } = data;

     
    const processedData = results
      .filter(item => item.isActive)  
      .map(({ name, age }) => ({ fullName: name.toUpperCase(), ageInMonths: age * 12 }))  
      .reduce((acc, curr) => {
        acc.push({ ...curr, id: acc.length + 1 });  
        return acc;
      }, []);

     
    const uniqueNames = new Set(processedData.map(item => item.fullName));

     
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Getting property: ${prop}`);
          return target[prop];
        } else {
          print(`Property ${prop} does not exist`);
        }
      }
    };

    const proxyData = new Proxy(processedData, handler);

     
    print('Unique Names:');
    uniqueNames.forEach(name => print(name));

     
    print('Proxy Data:', proxyData[0]);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
fetchAndProcessData('https://api.example.com/data');
