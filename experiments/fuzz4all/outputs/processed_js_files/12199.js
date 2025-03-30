 

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

 
function* dataGenerator(dataArray) {
  for (const item of dataArray) {
    yield item;
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} changed to ${value}`);
    target[property] = value;
    return true;
  },
};

 
function logClassName(target) {
  print(`Class created: ${target.name}`);
}

const dynamicClassName = "DynamicClass";
@logClassName
class [dynamicClassName] {
  constructor(data) {
    this.data = new Proxy(data, handler);
  }

  *[Symbol.iterator]() {
    yield* dataGenerator(this.data);
  }

  async loadAndIterate(url) {
    const data = await fetchData(url);
    if (data) {
      this.data.items = data;
      for (const item of this) {
        print(item);
      }
    }
  }
}

 
const apiUrl = "https://jsonplaceholder.typicode.com/posts";
const instance = new DynamicClass({ items: [] });

print(`Starting data fetch from: ${apiUrl}`);
instance.loadAndIterate(apiUrl?.toString());
