 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const fetchData = async (url) => {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new CustomError("Failed to fetch data");

     
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`Custom Error: ${error.message}`);
    } else {
      console.error(`Unexpected Error: ${error}`);
    }
  }
};

 
const target = { message: "Hello, World!" };
const handler = {
  set: (obj, prop, value) => {
    print(`Property '${prop}' is being set to '${value}'`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
proxy.message = "Hello, JavaScript!";

 
function* numberGenerator() {
  let i = 0;
  while (i < 3) {
    yield i++;
  }
}

 
const gen = numberGenerator();
for (const num of gen) {
  print(num);
}

 
((...numbers) => {
  const [first, ...rest] = numbers;
  print(`First: ${first}, Rest: ${rest}`);
})(1, 2, 3, 4, 5);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
