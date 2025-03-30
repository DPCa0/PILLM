 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const targetObj = { name: 'Proxy', value: 42 };

 
const proxyObj = new Proxy(targetObj, handler);

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched data:', data);

     
    print(proxyObj.name);  
    proxyObj.value = 100;  
    print(proxyObj.value);  

     
    const { randomUUID } = await import('crypto');
    print('Generated UUID:', randomUUID());
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
