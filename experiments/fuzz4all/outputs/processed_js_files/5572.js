 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

 
const createValidatedObject = (target) => {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (typeof value === 'string' && value.trim() !== '') {
        obj[prop] = value;
        return true;
      } else {
        throw new Error('Value must be a non-empty string');
      }
    },
  });
};

 
(async function() {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);

     
    const idGen = idGenerator();
    print('Generated IDs:', idGen.next().value, idGen.next().value, idGen.next().value);

     
    const validatedObject = createValidatedObject({});
    validatedObject.name = 'John Doe';  
    print('Validated Object:', validatedObject);
    
     
     

  } catch (error) {
    console.error('Error:', error);
  }
})();
