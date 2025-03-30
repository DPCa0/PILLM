 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
const handler = {
  get: (target, prop) => (prop in target ? target[prop] : `Property "${prop}" does not exist`)
};

const createProxy = (obj) => new Proxy(obj, handler);

 
function* numberGenerator(limit) {
  let count = 1;
  while (count <= limit) yield count++;
}

 
const formatMessage = (strings, ...expressions) =>
  strings.reduce((acc, str, index) => acc + str + (expressions[index] || ''), '');

const executeAsyncOperations = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    
     
    print(formatMessage`Fetched data: ${JSON.stringify(data, null, 2)}`);

     
    const userProxy = createProxy(data);
    print(userProxy.userId);  
    print(userProxy.nonExistentProp);  

     
    for (const num of numberGenerator(5)) {
      print(`Generated number: ${num}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

executeAsyncOperations();
