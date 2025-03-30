 

 
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
import { fetchData } from './myModule.js';

 
const getUserDetails = async (userId) => {
  try {
    const url = `https: 
    const { name, email, address: { city } } = await fetchData(url);

    print(`User Name: ${name}`);
    print(`Email: ${email}`);
    print(`City: ${city}`);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};

 
(async () => {
  await getUserDetails(1);
})();

To run this code, make sure you have a modern JavaScript environment set up, such as Node.js with ECMAScript module support or use a browser that supports the Fetch API natively.