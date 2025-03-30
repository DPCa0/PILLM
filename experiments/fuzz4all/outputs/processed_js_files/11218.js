 
async function* generateData() {
  const data = [1, 2, 3, 4, 5];
  for (const item of data) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield item * item;
  }
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.1 ? resolve('Data Fetched!') : reject('Fetch Failed');
    }, 500);
  });
}

async function processData() {
  try {
    const message = await fetchData();
    print(message);

    const result = [];
    const dataGenerator = generateData();

    for await (const value of dataGenerator) {
      result.push(value);
    }

    print('Processed Data:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

processData();

 
const handler = {
  get: (target, prop) => {
    print(`Accessed property: ${prop}`);
    return target[prop];
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);
print(user.name);  
print(user.age);   

 
const usersSet = new Set(['Alice', 'Bob', 'Charlie']);
usersSet.add('Dave').add('Eve');

const usersMap = new Map([...usersSet].map((user, index) => [index, user]));
usersMap.set(5, 'Frank');

for (const [id, name] of usersMap) {
  print(`User ID: ${id}, Name: ${name}`);
}

 
