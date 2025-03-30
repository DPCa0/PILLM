 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(...arguments);
    } else {
      console.warn(`Property "${prop}" does not exist on target`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(...arguments);
  }
};

 
const target = { name: 'Advanced JavaScript', level: 'Complex' };

 
const proxyObj = new Proxy(target, handler);

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id: 1, title: 'Learn Proxy' } }), 1000);
  });
}

async function main() {
   
  print(proxyObj.name);  
  print(proxyObj.nonExistent);  

   
  proxyObj.level = 'Master';

   
  const { data: { id, title } } = await fetchData();
  print(`Fetched Data - ID: ${id}, Title: "${title}"`);
}

main();
