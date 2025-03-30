 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'Alice', age: 30 });
    }, 1000);
  });
};

 
async function main() {
  try {
     
    const data = await fetchData();

     
    const handler = {
      get: (target, property) => {
        print(`Accessing property '${property}'`);
        return target[property];
      }
    };

     
    const proxiedData = new Proxy(data, handler);

     
    print(`User: ${proxiedData.user}`);
    print(`Age: ${proxiedData.age}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
main();
