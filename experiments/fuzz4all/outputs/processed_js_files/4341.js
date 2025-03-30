 
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const user = {
  name: 'Jane Doe',
  age: 28,
  email: 'jane.doe@example.com'
};

const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const proxiedUser = new Proxy(user, handler);

 
async function modifyUser() {
  print('Initial user:', proxiedUser.name);

  await wait(1000);   
  proxiedUser.name = 'John Doe';

  await wait(1000);   
  print('Updated user:', proxiedUser.name);
}

 
async function* fetchData() {
  const urls = ['url1.com', 'url2.com', 'url3.com'];
  for (const url of urls) {
    await wait(500);   
    yield `Data from ${url}`;
  }
}

async function processData() {
  for await (const data of fetchData()) {
    print(data);
  }
}

 
const defaultSettings = { theme: 'dark', layout: 'grid' };
const userSettings = { layout: 'list' };
const settings = { ...defaultSettings, ...userSettings };   

print('Settings:', settings);

const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
print('New array:', newArr);

 
modifyUser();
processData();
