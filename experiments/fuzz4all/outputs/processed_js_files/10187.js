 

 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new CustomError(`Error: ${response.status}`);
    let data = await response.json();
    print(data);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(`CustomError caught: ${error.message}`);
    } else {
      console.error(`Unexpected error: ${error}`);
    }
  }
}

 
async function* asyncGenerator(arr) {
  for (const item of arr) {
    yield await Promise.resolve(item);
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const target = { a: 1 };
const proxy = new Proxy(target, handler);

 
proxy.a = 2;         
print(proxy.a);  

 
(async () => {
  const iterable = asyncGenerator([1, 2, 3]);
  for await (const value of iterable) {
    print(value);
  }
})();

 
 
