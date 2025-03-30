class User {
  #name;  
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }
  get details() {
    return `${this.#name}, Age: ${this.age}`;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function* fetchDataStream(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value, { stream: true });
    yield result;
  }
}

async function init() {
  const proxyHandler = {
    get: (target, prop) => {
      if (prop in target) {
        print(`Accessing ${prop}`);
        return target[prop];
      } else {
        throw new Error(`Property ${prop} not found`);
      }
    }
  };

  const user = new User("Alice", 30);
  const proxiedUser = new Proxy(user, proxyHandler);

  try {
    print(proxiedUser.details);
  } catch (e) {
    console.error(e.message);
  }

  const stream = fetchDataStream('https://jsonplaceholder.typicode.com/posts');
  for await (const data of stream) {
    print(data);
    await wait(1000);  
  }
}

init();
