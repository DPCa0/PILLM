 
async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

     
    const data = await response.json();
    const uniqueNames = new Set(data.map(item => item.name));

     
    const [first, ...rest] = [...uniqueNames];
    print(`First unique name: ${first}`);
    print(`Rest of the names: ${rest.join(', ')}`);

     
    await Promise.all([...uniqueNames].map(name => delayLog(name)));
  } catch (error) {
    console.error('Error:', error);
  }
}

 
function delayLog(name) {
  return new Promise(resolve => setTimeout(() => {
    print(`Processing ${name}`);
    resolve();
  }, Math.random() * 1000));
}

 
const target = { message: 'Hello, Proxy!' };
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : 'Property does not exist'),
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
print(proxy.message);
proxy.message = 'New Message';
print(proxy.nonExistent);

 
fetchAndProcessData('https://jsonplaceholder.typicode.com/users');
