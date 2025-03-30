 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
    return `Property ${prop} does not exist`;
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function simulateAsyncOperation(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        print('Data processed:', data);
        resolve(`Processed: ${data}`);
      } else {
        reject('No data provided');
      }
    }, 1000);
  });
}

 
(async function main() {
   
  print(user.name);
  user.age = 31;
  print(user.age);
  
   
  await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  
   
  try {
    let result = await simulateAsyncOperation('Sample Data');
    print(result);
  } catch (error) {
    console.error(error);
  }
})();
