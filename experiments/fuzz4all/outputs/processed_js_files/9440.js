 
async function* fetchData(apiUrls) {
  for (const url of apiUrls) {
    await new Promise(res => setTimeout(res, 1000));  
    yield `Data from ${url}`;  
  }
}

 
const logAccessHandler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, logAccessHandler);

 
print(`User name is: ${Reflect.get(user, 'name')}`);

 
const users = [{ name: 'Bob' }, { }, { name: 'Charlie' }];
const names = users.map(user => user.name?.toUpperCase() ?? 'UNKNOWN');
print(names);

 
const promises = [
  Promise.resolve(42),
  Promise.reject('Failed'),
  Promise.resolve('Success')
];

Promise.allSettled(promises).then(results => {
  for (const { status, value, reason } of results) {
    print(status === 'fulfilled' ? `Value: ${value}` : `Error: ${reason}`);
  }
});

 
(() => {
  const [, secondItem] = ['First', 'Second', 'Third'];
  print(`The second item is ${secondItem}`);
})();

 
(async () => {
  const apiUrls = ['api/endpoint1', 'api/endpoint2', 'api/endpoint3'];
  for await (const data of fetchData(apiUrls)) {
    print(data);
  }
})();
