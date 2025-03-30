 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

 
function* objectIterator(obj) {
  for (const key of Object.keys(obj)) {
    yield { key, value: obj[key] };
  }
}

 
const loggerHandler = {
  get: function (target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set: function (target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

 
const user = {
  name: "Alice",
  age: 30,
};

const userProxy = new Proxy(user, loggerHandler);

 
const iterator = objectIterator(userProxy);

print("Iterating over properties using generator:");
for (const { key, value } of iterator) {
  print(`${key}: ${value}`);
}

 
(async function () {
  try {
    const data = await fetchData("https://jsonplaceholder.typicode.com/posts/1");
    print("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
