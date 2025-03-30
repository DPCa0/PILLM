const fetch = require('node-fetch');

 
const greet = ({ name, age, ...rest }) => {
  return `Hello, ${name}! You are ${age} years old. ${JSON.stringify(rest)}`;
};

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const dynamicProperty = Symbol('dynamic');
const user = {
  name: 'Alice',
  age: 30,
  [dynamicProperty]: 'This is a dynamic property'
};

 
(async () => {
  const idGen = idGenerator();

   
  const [firstId, ...nextIds] = [idGen.next().value, idGen.next().value, idGen.next().value];
  
  print(`First ID: ${firstId}, Next IDs: ${nextIds}`);

  print(greet(user));

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
  print('Fetched data:', data && data.slice(0, 3));
})();
