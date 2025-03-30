 

 
async function* fetchData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  const promises = urls.map(url => fetch(url).then(response => response.json()));
  for await (const data of Promise.all(promises)) {
    yield data;
  }
}

 
function html(strings, ...values) {
  return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

 
const user = { name: 'Alice', age: 25 };
const handler = {
  set(target, prop, value) {
    print(`Property ${prop} changed from ${target[prop]} to ${value}`);
    target[prop] = value;
    return true;
  }
};
const observedUser = new Proxy(user, handler);

 
const privateProp = Symbol('private');
observedUser[privateProp] = 'secret';

 
(async function() {
  for await (const post of fetchData()) {
    print(html`<h2>${post.title}</h2><p>${post.body}</p>`);
  }
})();

 
observedUser.name = 'Bob';
print(`Private property is: ${observedUser[privateProp]}`);

 
const settings = { volume: 0, theme: 'dark' };
print(`Volume is set to: ${settings?.volume ?? 'default'}`);
print(`Theme is set to: ${settings?.theme ?? 'light'}`);
