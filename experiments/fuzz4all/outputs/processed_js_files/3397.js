 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

 
const loggingHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Property "${prop}" accessed with value: ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist`);
      return undefined;
    }
  }
};

 
let data = { name: 'Alice', age: 25 };
const proxiedData = new Proxy(data, loggingHandler);

 
function* dataGenerator(dataArray, chunkSize) {
  for (let i = 0; i < dataArray.length; i += chunkSize) {
    yield dataArray.slice(i, i + chunkSize);
  }
}

 
(async () => {
  const apiURL = 'https://jsonplaceholder.typicode.com/posts';
  const posts = await fetchData(apiURL);

  if (posts) {
    const gen = dataGenerator(posts, 5);
    for (const chunk of gen) {
      print('Processing chunk:', chunk);
    }
  }

   
  print(proxiedData.name);  
  print(proxiedData.height);  
})();
