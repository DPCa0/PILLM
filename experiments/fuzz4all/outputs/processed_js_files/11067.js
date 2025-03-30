 

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get(target, prop) {
    return prop in target ? target[prop] : 'Property does not exist';
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
      return true;
    } else {
      print('Value must be a number');
      return false;
    }
  }
};

 
const numbers = {};
const proxyNumbers = new Proxy(numbers, handler);

 
proxyNumbers.value1 = 10;     
proxyNumbers.value2 = 'ten';  

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

(async () => {
   
  const { title, body } = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(`Title: ${title}`);
  print(`Body: ${body}`);
})();
