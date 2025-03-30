 

 
async function fetchData(urls) {
  const fetchPromises = urls.map(url =>
    fetch(url).then(response => response.json()).catch(err => ({ error: err.message }))
  );

  const results = await Promise.allSettled(fetchPromises);
  return results.map(result => (result.status === 'fulfilled' ? result.value : result.reason));
}

 
const reactiveHandler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const data = new Proxy({ name: 'World', greeting: 'Hello' }, reactiveHandler);
data.greeting = 'Hi';

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const user = { name: 'Alice', age: 25, location: 'Wonderland' };
const { name, ...otherDetails } = user;
print(name);  
print(otherDetails);  

 
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
(async () => {
  const [first, second] = await fetchData(urls);
  print(first?.title ?? 'No title');  
  print(second?.title ?? 'No title');
})();
