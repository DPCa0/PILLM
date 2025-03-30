Certainly! Here's a JavaScript program that demonstrates several advanced features, including ES6+ syntax, promises, async/await, and generators:

// Asynchronous generator function
async function* fetchDataSequentially(urls) {
  for (const url of urls) {
    // Simulate asynchronous fetch with a promise
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.2 ? resolve(`Fetched data from ${url}`) : reject(`Failed to fetch from ${url}`);
      }, 1000);
    });
  }
}

// Main asynchronous function using async/await
async function handleDataFetching() {
  const urls = ['https: 

   
  for await (const fetchPromise of fetchDataSequentially(urls)) {
    try {
      const data = await fetchPromise;
      print(data);
    } catch (error) {
      console.error(error);
    }
  }
}

 
const complexObject = {
  id: 1,
  name: 'Complex Object',
  attributes: {
    color: 'red',
    size: 'large',
  },
  tags: ['example', 'test', 'demo'],
};

const {
  id,
  name,
  attributes: { color },
  tags: [firstTag, ...remainingTags],
} = complexObject;

print(`ID: ${id}, Name: ${name}, Color: ${color}, First Tag: ${firstTag}`);
print(`Remaining Tags: ${remainingTags.join(', ')}`);

 
handleDataFetching();

This program defines an asynchronous generator function `fetchDataSequentially` to simulate fetching data from an array of URLs. The `handleDataFetching` function handles these asynchronous tasks using `for await...of`. It also showcases destructuring and the rest parameter in a complex object.