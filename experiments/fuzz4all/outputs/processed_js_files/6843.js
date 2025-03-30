 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
     
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();
    return data;
  } catch (error) {
     
    console.error('Fetch error:', error);
    return null;
  }
}

 
const loggingHandler = {
  get(target, propKey) {
    print(`Accessing property: ${propKey}`);
    return target[propKey];
  },
};

 
const dataObject = {
  name: 'JavaScript',
  type: 'Programming Language',
  rank: 1,
};

 
const proxiedData = new Proxy(dataObject, loggingHandler);

 
function createMessage({ name, type, rank }) {
  return `The ${type} "${name}" is ranked #${rank}.`;
}

 
(async function () {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  
   
  const apiData = await fetchData(url);

   
  print('Fetched API Data:', apiData);

   
  print(createMessage(proxiedData));
})();
