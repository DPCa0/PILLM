 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return Reflect.get(target, prop, receiver);
    }
    return `Property "${prop}" does not exist.`;
  },
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/invalid-url',
];

async function getAllData() {
  const promises = urls.map(url => fetchData(url).catch(error => error));
  const results = await Promise.allSettled(promises);
  results.forEach((result, idx) => {
    print(`URL: ${urls[idx]}`, result);
  });
}

 
(async () => {
  if (user?.name) {
    print(`User's name is ${user.name}`);
  }
  try {
    const lodash = await import('lodash');
    print('Lodash imported:', lodash.isEmpty({}));
  } catch (e) {
    console.error('Failed to import lodash:', e.message);
  }
})();

 
getAllData();
