 
'use strict';

 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

 
const loggerHandler = {
  get: (target, property) => {
    print(`Property '${property}' has been accessed.`);
    return target[property];
  }
};

const config = new Proxy({
  apiEndpoint: 'https://jsonplaceholder.typicode.com/posts/1'
}, loggerHandler);

 
function printUser({ userId, id, title, body }) {
  print(`User ID: ${userId}\nPost ID: ${id}\nTitle: ${title}\nBody: ${body}`);
}

 
(async () => {
  try {
     
    const postData = await fetchData(config.apiEndpoint);

     
    printUser(postData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
