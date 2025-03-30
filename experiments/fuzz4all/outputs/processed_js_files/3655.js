 
async function* fetchUrls(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.text());
  }
}

async function fetchAll(urls) {
  const results = [];
  for await (const textPromise of fetchUrls(urls)) {
    results.push(textPromise);
  }
  return results;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
  print("Fetching URLs...");

  try {
    const results = await fetchAll(urls);
    results.forEach(result => print(result));

    print("Waiting for 2 seconds...");
    await delay(2000);

    print("Refetching URLs...");
    const refetchResults = await fetchAll(urls);
    refetchResults.forEach(result => print(result));
  } catch (error) {
    console.error('Error fetching URLs:', error);
  }
}

main();
