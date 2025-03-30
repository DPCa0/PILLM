 

 
function* fetchData(urls) {
  for (let url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
async function processUrls(urls) {
  const urlGenerator = fetchData(urls);
  const results = [];

  for (let promise of urlGenerator) {
    const data = await promise;
    results.push(data);
  }
  
  return results;
}

 
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3"
];

 
const handler = {
  get: function(target, prop) {
    print(`Accessing property '${prop}'`);
    return target[prop];
  }
};

async function main() {
  try {
    let results = await processUrls(urls);
    
     
    results = new Proxy(results, handler);

     
    print(results[0]);  
    print(results[1]);  
    print(results.length);  
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

main();
