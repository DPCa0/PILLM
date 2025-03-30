 
 

 
async function* fetchAndTransform(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield { url, data: transformData(data) };
  }
}

 
function transformData(data) {
  return Object.entries(data)
    .map(([key, value]) => ({ [key.toUpperCase()]: value }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return target[prop];
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

 
(async function main() {
  for await (const { url, data } of fetchAndTransform(urls)) {
    const proxiedData = new Proxy(data, handler);
    const { TITLE, BODY } = proxiedData;
    print(`Data from ${url}:`);
    print(`Title: ${TITLE}`);
    print(`Body: ${BODY}`);
  }
})();
