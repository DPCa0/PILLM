 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

 
async function fetchData(generator) {
  for (let i = 0; i < 5; i++) {
    await delay(1000);  
    print(`Fetched number: ${generator.next().value}`);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  },
};

 
const data = {
  name: 'JavaScript',
  type: 'Language',
};

 
const proxiedData = new Proxy(data, handler);

 
proxiedData.name;  
proxiedData.type = 'Programming Language';  

 
(async () => {
  const generator = numberGenerator();
  await fetchData(generator);
})();
