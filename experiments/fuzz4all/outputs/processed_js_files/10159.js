 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);
  return { data: 'Hello, world!' };
}

 
const privateData = Symbol('privateData');

 
const handler = {
  get(target, prop) {
    if (prop === privateData) {
      return 'Access Denied';
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === privateData) {
      print('Cannot modify private data');
      return false;
    }
    target[prop] = value;
    return true;
  }
};

 
const obj = new Proxy({
  [privateData]: 'Top Secret',
  message: ''
}, handler);

 
async function main() {
  try {
     
    const response = await fetchData();
    obj.message = response.data;

     
    print(`Public Message: ${obj.message}`);
    print(`Private Data Attempt: ${obj[privateData]}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
