 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const displayData = ({ name, age, job }) => {
  print(`Name: ${name}, Age: ${age}, Job: ${job}`);
};

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const personHandler = {
  get(target, prop, receiver) {
    if (!(prop in target)) {
      print(`Property "${prop}" doesn't exist.`);
      return;
    }
    return Reflect.get(target, prop, receiver);
  },
};

const person = new Proxy({ name: 'Alice', age: 30, job: 'Engineer' }, personHandler);

// Async IIFE to run the code
(async () => {
  const url = 'https: 
  const userData = await fetchData(url);
  if (userData) {
    const { name, username, email } = userData;
    displayData({ name, age: 25, job: 'Developer' });
    print(`Fetched User: ${name} (${username}, ${email})`);
  }

   
  print(person.name);  
  print(person.height);  

   
  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  
})();
