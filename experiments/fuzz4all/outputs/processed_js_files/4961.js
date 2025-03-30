 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${String(prop)} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const target = { name: 'AdvancedJS', version: 1.0 };
const proxy = new Proxy(target, handler);

 
function* sequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];

Promise.all(urls.map(url => fetchData(url)))
  .then(results => {
    print('Fetched Data:', results);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

 
const uniqueKey = Symbol('uniqueKey');
proxy[uniqueKey] = 'This is a unique key value';

 
proxy.name = 'AdvancedJavaScript';
print(proxy.name);

for (const num of sequence(1, 3)) {
  print(`Generated number: ${num}`);
}

 
const user = {
  profile: {
    name: 'John Doe'
  }
};

print(user.profile?.name ?? 'Anonymous');
print(user.settings?.theme ?? 'Default Theme');
