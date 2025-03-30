 
const fetchData = () => new Promise(resolve => {
  const delay = Math.floor(Math.random() * 3000) + 500;
  setTimeout(() => resolve(`Data fetched in ${delay}ms`), delay);
});

 
const fetchMultipleData = async () => {
  const urls = ['url1', 'url2', 'url3'];
  try {
    const dataPromises = urls.map(url => fetchData(url));
    const results = await Promise.all(dataPromises);
    print('All data fetched:', results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const targetObj = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, prop) {
    print(`Property ${prop} was accessed`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Property ${prop} was set to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxyObj = new Proxy(targetObj, handler);
proxyObj.a;         
proxyObj.b = 10;    

 
function* numberGenerator() {
  yield* [1, 2, 3, 4, 5];
}

const [first, second, ...rest] = numberGenerator();
print('First:', first);        
print('Second:', second);      
print('Rest:', rest);          

 
fetchMultipleData();
