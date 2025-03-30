 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new CustomError(`Network response was not ok: ${response.statusText}`);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error("Custom Error:", error.message);
    } else {
      console.error("General Error:", error);
    }
  }
}

 
const dataHandler = {
  get(target, prop, receiver) {
    print(`Getting property: ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
function* dataGenerator(dataArray) {
  for (let data of dataArray) {
    yield data;
  }
}

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    let val = values[i] ? `<strong>${values[i]}</strong>` : "";
    return acc + str + val;
  }, "");
}

 
(async function main() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const rawData = await fetchData(url);
  
   
  const proxyData = new Proxy(rawData, dataHandler);

   
  const generator = dataGenerator(proxyData);

  for (let post of generator) {
    print(tag`Title: ${post.title}, Body: ${post.body}`);
    if (generator.next().done) break;
  }
})();
