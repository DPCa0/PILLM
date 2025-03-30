 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      yield data;
    } catch (error) {
      yield { error: `Failed to fetch from ${url}` };
    }
  }
}

 
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "invalid-url"
];

 
const transformData = (transformFn) => async (iterator) => {
  const results = [];
  for await (const item of iterator) {
    results.push(transformFn(item));
  }
  return results;
};

 
const addTimestamp = (data) => ({
  ...data,
  timestamp: new Date().toISOString()
});

 
(async () => {
  const transformedData = await transformData(addTimestamp)(fetchData(urls));
  print(transformedData);
})();
