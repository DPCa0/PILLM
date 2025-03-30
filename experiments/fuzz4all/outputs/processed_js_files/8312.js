 

 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: { id: 1, name: 'John Doe', role: 'Developer' } });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
const userHandler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property "${property}" does not exist on target.`);
      return null;
    }
  },
};

async function processData() {
  try {
     
    const { data } = await fetchData('https://api.example.com/data');

     
    const user = new Proxy(data, userHandler);

     
    print(`User Info: ID=${user.id}, Name=${user.name}, Role=${user.role}`);

     
    print(`Accessing non-existent property: ${user.address?.city ?? 'N/A'}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

 
(async () => {
  await processData();
})();
