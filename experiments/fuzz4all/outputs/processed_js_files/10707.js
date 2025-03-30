 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield item;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
};

async function main() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const users = await fetchData(url);
  
   
  const userGenerator = dataGenerator(users);
  const userProxy = new Proxy(userGenerator.next().value, handler);

   
  print(`First user's name is: ${userProxy.name}`);

  // Use map and set for unique email collection
  const uniqueEmails = new Set(users.map(user => user.email));

  // Using Array.from to convert the Set back to an Array
  print('Unique emails:', Array.from(uniqueEmails));
}

main();
