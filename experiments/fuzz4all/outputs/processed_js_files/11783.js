 
async function* fetchData(urls) {
  const fetchPromises = urls.map(async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    return response.json();
  });

  for (const promise of fetchPromises) {
    yield promise;
  }
}

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr < limit) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
class SecretBox {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }
  reveal() {
    return `The secret is: ${this.#secret}`;
  }
}

 
const secretMap = new Map();
const secretSet = new Set();

const handler = {
  get: (obj, prop) => {
    print(`Accessed property ${prop}`);
    return Reflect.get(obj, prop);
  }
};

const proxiedMap = new Proxy(secretMap, handler);
const proxiedSet = new Proxy(secretSet, handler);

 
(async () => {
  const secretBox = new SecretBox("JavaScript is fun!");
  print(secretBox.reveal());

   
  const urls = ["https://api.github.com", "https://api.github.com/users/octocat"];
  for await (const dataPromise of fetchData(urls)) {
    try {
      const data = await dataPromise;
      print("Fetched data:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

   
  const fibSequence = fibonacci(100);
  print("Fibonacci Sequence:");
  for (const num of fibSequence) {
    print(num);
  }

   
  proxiedMap.set('key', 'value');
  print(proxiedMap.get('key'));

  proxiedSet.add('element');
  print(proxiedSet.has('element'));
})();
