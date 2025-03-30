 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
function* createIdGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const handler = {
  set(target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Age must be a non-negative number');
    }
    Reflect.set(target, key, value);
  }
};

 
const person = new Proxy({}, handler);

 
async function main() {
   
  const idGen = createIdGenerator();
  print(`Generated ID: ${idGen.next().value}`);

   
  try {
    person.age = 25;
    person.name = 'John Doe';
    print(`Person created: ${JSON.stringify(person)}`);
     
     
  } catch (error) {
    console.error(error.message);
  }

   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

 
main();
