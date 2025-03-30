 

 
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData() {
  yield 'Fetching data...';
  await wait(1000);
  yield { name: 'Alice', age: 30 };
  await wait(1000);
  yield { name: 'Bob', age: 25 };
  await wait(1000);
  yield 'Data fetched successfully.';
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
  set: (obj, prop, value) => {
    if (typeof value === 'string' && value.length < 2) {
      console.error('Error: Name must be at least 2 characters long.');
    } else {
      print(`Setting ${prop} to ${value}`);
      obj[prop] = value;
    }
    return true;
  }
};

 
const person = {
  name: 'John',
  age: 35
};

const proxyPerson = new Proxy(person, handler);

 
(async () => {
  for await (let data of fetchData()) {
    print(data);
    if (typeof data === 'object') {
      proxyPerson.name = data.name;
      print(`Name from proxy: ${proxyPerson.name}`);
    }
  }
})();

 
proxyPerson.name = 'J';   
proxyPerson.age = 40;     
print(proxyPerson.address);   
