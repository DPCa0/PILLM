 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting '${prop}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

 
const complexObject = {
  user: { 
    name: 'Alice', 
    details: { age: 30, occupation: 'Engineer' }
  },
  hobbies: ['Reading', 'Hiking', 'Coding']
};

 
const proxyObject = new Proxy(complexObject, handler);

 
function* hobbyGenerator() {
  for (const hobby of proxyObject.hobbies) {
    yield hobby;
  }
}

 
(async function() {
   
  const { user: { name, ...otherDetails }, hobbies } = proxyObject;

  print(`Name: ${name}`);
  print(`Other details:`, otherDetails);
  
   
  const gen = hobbyGenerator();
  for (let hobby of gen) {
    print(`Hobby: ${hobby}`);
  }

   
  try {
    const url = 'https://api.example.com/data';
    const data = await fetchData(url);
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
