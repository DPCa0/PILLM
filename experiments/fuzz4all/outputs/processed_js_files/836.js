 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property ${property}: ${target[property]}`);
      return target[property];
    }
    throw new ReferenceError(`Property ${property} does not exist.`);
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const dataObject = {
  name: 'Example',
  version: '1.0'
};

const proxiedData = new Proxy(dataObject, handler);

 
function* generateData() {
  yield* [1, 2, 3, 4];
}

const [a, b, ...rest] = generateData();
print(`Destructured Values: a=${a}, b=${b}, rest=${rest}`);

 
(async () => {
  try {
    const apiData = await fetchData('https://api.publicapis.org/entries');
    proxiedData.name = apiData.entries[0].API;
    print(`Fetched API name: ${proxiedData.name}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
})();
