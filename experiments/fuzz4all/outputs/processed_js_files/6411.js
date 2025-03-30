 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
function* paginate(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const loggingHandler = {
  get: (target, prop) => {
    print(`Property '${prop}' was accessed.`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to '${value}'.`);
    target[prop] = value;
    return true;
  }
};

 
const dataObject = {
  property1: 'Initial Value',
  property2: 'Another Value',
};

 
const proxiedDataObject = new Proxy(dataObject, loggingHandler);

 
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

 
(async function processPaginatedData() {
  const paginator = paginate(urls);

  for await (const page of paginator) {
    print('Page Data:', page);
     
    print(proxiedDataObject.property1);
    proxiedDataObject.property1 = 'Updated Value';
  }
})();
