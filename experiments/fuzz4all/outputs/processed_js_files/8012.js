 
 

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData() {
  await delay(500);  
  return { user: { id: 1, name: 'Alice', role: 'admin' } };
}

const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `Property ${prop} not found`;
  }
};

async function main() {
  try {
    const data = await fetchData();
    const { user: { name, role } } = data;  
    print(`Fetched User: ${name}, Role: ${role}`);

    const userProxy = new Proxy(data.user, handler);
    print(`Name from Proxy: ${userProxy.name}`);
    print(`Nonexistent Property: ${userProxy.age}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
