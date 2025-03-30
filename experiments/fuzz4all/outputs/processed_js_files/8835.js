 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url === 'https://api.example.com/data') {
      resolve({ data: { name: 'John Doe', age: 30 } });
    } else {
      reject('URL not found');
    }
  }, 1000);
});

 
function* objectIterator(obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

 
async function processUserData(url) {
  try {
    const { data } = await fetchData(url);
    
     
    const { name = 'Unknown', age = 'N/A' } = data;
    
     
    const userDataIterator = objectIterator(data);
    let userDetails = 'User Details:\n';
    for (const [key, value] of userDataIterator) {
      userDetails += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
    }

     
    print(`\nRetrieved Data:\n${userDetails}`);

     
    print(`\n${name} is ${age} years old.`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
}

 
processUserData('https://api.example.com/data');
