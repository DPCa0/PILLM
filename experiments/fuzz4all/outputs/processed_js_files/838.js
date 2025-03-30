 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData(endpoint) {
  await delay(1000);  
  if (endpoint === 'error') throw new Error('Network Error');
  return { data: `Response from ${endpoint}` };
}

 
const handler = {
  get: (target, prop, receiver) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

 
async function main() {
  const apiData = new Proxy({}, handler);

  try {
    apiData.user = await fetchData('user');
    print(apiData.user);
    
    apiData.posts = await fetchData('posts');
    print(apiData.posts);

     
    await fetchData('error');
  } catch (error) {
    console.error(error.message);
  }
}

 
main();
