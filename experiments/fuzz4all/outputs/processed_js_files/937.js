 

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
}

 
function createMultiplier(multiplier) {
  return function(x) {
    return x * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

 
const target = {
  name: "Advanced JS",
  type: "Complex"
};

const handler = {
  get: function(obj, prop) {
    print(`Accessed property: ${prop}`);
    return prop in obj ? obj[prop] : `Property ${prop} not found`;
  }
};

const proxy = new Proxy(target, handler);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

 
(async function main() {
  const apiData = await fetchData("https://api.github.com");
  print(apiData ? "Fetched API Data" : "API Data fetch failed");

  print(`Double of 4: ${double(4)}`);
  print(`Triple of 4: ${triple(4)}`);

  print(proxy.name);
  print(proxy.unknownProp);

  print(`Generated ID: ${gen.next().value}`);
  print(`Generated ID: ${gen.next().value}`);
})();
