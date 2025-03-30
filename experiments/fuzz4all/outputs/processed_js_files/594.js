 

 
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);
  return await response.json();
};

export const processData = ({ results }) => results.map(({ name, population }) => ({ name, population }));

 
import { delay, fetchData, processData } from './utils.js';

const logCountries = async () => {
  try {
    print('Fetching data...');
    await delay(1000);  

    const data = await fetchData('https://restcountries.com/v3.1/all');
    const countries = processData(data);

    print('Top 5 Most Populated Countries:');
    countries
      .sort((a, b) => b.population - a.population)
      .slice(0, 5)
      .forEach(({ name, population }) => print(`${name.common}: ${population.toLocaleString()}`));

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

logCountries();
To execute this, you need to run it in an environment that supports ES6 modules, like a browser with module support or a Node.js environment using `--experimental-modules` or similar. Make sure you have an internet connection to fetch data from the API.