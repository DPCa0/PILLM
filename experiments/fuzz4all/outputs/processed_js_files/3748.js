 

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Property accessed: ${prop}`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    }
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

 
async function fetchData(url) {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
async function main() {
  try {
     
    const { name, age } = user;

     
    print(`User Info: Name - ${name}, Age - ${age}`);

     
    const data = await fetchData('https://api.example.com/data');
    print(`Fetched data: ${data}`);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
}

 
main();
