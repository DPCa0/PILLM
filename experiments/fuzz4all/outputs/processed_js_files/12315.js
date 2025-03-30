 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist on target.`);
      return undefined;
    }
  },
};

async function main() {
  const dataUrl = 'https://jsonplaceholder.typicode.com/todos/1';

   
  const dataPromise = fetchData(dataUrl);
  const dataProxy = new Proxy({ data: null }, handler);

  try {
    dataProxy.data = await dataPromise;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print('Data:', dataProxy.data);

   
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
  ];

  try {
    const results = await Promise.all(urls.map((url) => fetchData(url)));
    print('Multiple Fetch Results:', results);
  } catch (error) {
    console.error('Error in fetching multiple resources:', error);
  }
}

main();
