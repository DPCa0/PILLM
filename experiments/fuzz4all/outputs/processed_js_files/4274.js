 
async function complexOperation() {
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve('Data Fetched'), 1000);
  });

  const processData = (data) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data === 'Data Fetched') resolve('Data Processed');
      else reject('Processing Failed');
    }, 1000);
  });

  try {
    const fetchedData = await fetchData();
    print(fetchedData);

    const processedData = await processData(fetchedData);
    print(processedData);
  } catch (error) {
    console.error(error);
  }
}

 
const person = {
  name: 'Alice',
  age: 25
};

const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
  },
  set: (target, prop, value) => {
    if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
      print('Invalid age value');
      return false;
    }
    target[prop] = value;
    return true;
  }
};

const proxyPerson = new Proxy(person, handler);

print(proxyPerson.name); // Alice
print(proxyPerson.age);  // 25
print(proxyPerson.height); // Property height doesn't exist

proxyPerson.age = 30;            
proxyPerson.age = -1;            

 
complexOperation();

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const user = { username: 'Bob', email: 'bob@example.com', age: 30 };
const { username, ...otherDetails } = user;
print(username);   
print(otherDetails);  

const numbers = [1, 2, 3, 4, 5];