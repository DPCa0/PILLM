 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

 
const handler = {
  get: (target, property) => {
    print(`Property ${property} has been accessed.`);
    return property in target ? target[property] : `Property ${property} does not exist.`;
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}.`);
    target[property] = value;
    return true;
  }
};

const reactiveObject = new Proxy({}, handler);

 
function* processData(data) {
  for (let item of data) {
    yield item * 2;  
  }
}

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const processedDataGenerator = processData(data.map(post => post.id));
    
    reactiveObject.title = data[0].title;  

    for (let processed of processedDataGenerator) {
      print(`Processed data: ${processed}`);
    }
  } catch (error) {
    console.error(`An error occurred: ${error}`);
  }
})();

 
class User {
  #privateField = 'This is private';

  #privateMethod() {
    return 'Accessed private method';
  }

  publicMethod() {
    print(this.#privateField);
    print(this.#privateMethod());
  }
}

const user = new User();
user.publicMethod();
