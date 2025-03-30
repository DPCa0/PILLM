class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function fetchData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
}

async function processData() {
  const data = await fetchData();
  const [firstPost, ...remainingPosts] = data;
  
  print(`Title: ${firstPost.title}`);
  print(`Body: ${firstPost.body.substring(0, 50)}...`);

  const deferred = new Deferred();
  setTimeout(() => deferred.resolve('Processed remaining posts'), 2000);

  return deferred.promise;
}

async function main() {
  try {
    const message = await processData();
    print(message);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
