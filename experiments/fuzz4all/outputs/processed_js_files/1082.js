 
async function* fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  for (const item of data) {
    yield item;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => (
    `${result}${str}<strong>${values[i] || ''}</strong>`
  ), '');
}

const greeting = highlight`Hello, ${user.name}! You are ${user.age} years old.`;

 
(async () => {
  for await (const item of fetchData('https://jsonplaceholder.typicode.com/posts')) {
    print(item);
    if (item.id >= 5) break;  
  }
})();

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  const [post1, post2] = await Promise.all(urls.map(url => fetch(url).then(resp => resp.json())));
  
  print('Post 1:', post1);
  print('Post 2:', post2);
})();

print(greeting);  
