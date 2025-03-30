 
(async () => {
  if (typeof window === "undefined") {
     
    const fs = await import('fs/promises');
    await fs.writeFile('hello.txt', 'Hello, FileSystem!', 'utf8');
    print('File written successfully in Node.js environment.');
  } else {
    print('Running in a browser environment.');
  }
})();

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting value for ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} doesn't exist`);
      return 42; // Default value
    }
  },
  set: (target, prop, value) => {
    print(`Setting value for ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const advancedObject = new Proxy({}, handler);
advancedObject.existingProp = 10;
print(advancedObject.existingProp);
print(advancedObject.nonExistingProp);

// Using Generator function to yield multiple values
function* numberGenerator() {
  yield* [1, 2, 3, 4, 5];
}

const gen = numberGenerator();
for (const num of gen) {
  print(num);
}

// Implementing Async/Await with Promise and handling errors
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData('https: 
