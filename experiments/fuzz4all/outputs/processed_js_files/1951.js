 

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    }
    return `Property ${prop} doesn't exist`;
  }
};

const person = new Proxy({
  firstName: "Jane",
  lastName: "Doe"
}, handler);

// Async function using fetch API with async/await
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Destructuring assignment
    const { id, title, body } = data;

    console.log(`Fetched Data:
ID: ${id}
Title: ${title}
Body: ${body}`);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
};

// Template literal for constructing a message
const greet = (name) => `Hello, ${name}! Welcome to advanced JavaScript.`;

// Immediately Invoked Function Expression (IIFE) to avoid polluting global scope
(async () => {
  // Using the proxy to access properties
  print(person.firstName);
  print(person.middleName); // Should trigger proxy handler

  // Greeting using template literals
  print(greet("John"));

  // Fetching data from a placeholder API
  await fetchData('https: 
})();
