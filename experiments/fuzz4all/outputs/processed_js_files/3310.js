 

 
function* dataFetcher() {
  yield fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json());

  yield fetch('https://jsonplaceholder.typicode.com/posts/2')
    .then(response => response.json());
}

 
async function fetchData() {
  const generator = dataFetcher();

  for (let dataPromise of generator) {
    const data = await dataPromise;
    print('Data received:', data);
  }
}

 
const settings = {
  theme: 'dark',
  notifications: true
};

const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' was read`);
    return prop in target ? target[prop] : 'N/A';
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' was set to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const proxiedSettings = new Proxy(settings, handler);

 
print(proxiedSettings.theme);
proxiedSettings.theme = 'light';
print(proxiedSettings.language);

 
(async () => {
  print('Fetching data asynchronously:');
  await fetchData();

  print('Manipulating settings through proxy:');
  print('Current theme:', proxiedSettings.theme);
  proxiedSettings.notifications = false;
  print('Notifications enabled:', proxiedSettings.notifications);
})();
