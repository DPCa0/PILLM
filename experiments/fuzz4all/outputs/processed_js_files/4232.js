 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
  await delay(1000);  
  if (url !== "https://example.com/data") throw new Error("Network Error");
  return { data: { name: "John Doe", age: 30, location: "Earth" } };
}

const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`${prop} does not exist.`);
      return undefined;
    }
  }
};

const fetchGenerator = function*(url) {
  try {
    print(`Starting fetch from ${url}`);
    const result = yield fetchData(url);
    yield result.data;
  } catch (e) {
    console.error(e.message);
  }
};

const run = async (gen, url) => {
  const iterator = gen(url);
  const { value: dataPromise } = iterator.next();
  try {
    const data = await dataPromise;
    const { value: user } = iterator.next(data);
    const proxyUser = new Proxy(user, handler);
    const { name, age } = proxyUser;
    print(`Processed Data: ${name} is ${age} years old`);
  } catch (e) {
    console.error('Failed to process data:', e.message);
  }
};

run(fetchGenerator, "https://example.com/data");
