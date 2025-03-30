 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      yield { url, data };
    } catch (error) {
      yield { url, error };
    }
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

const dataObject = new Proxy({ name: 'JavaScript', version: 'ES2023' }, handler);

 
const version = dataObject?.version ?? 'unknown';
print(`Version: ${version}`);

 
class SecretKeeper {
  #secrets = new Map();

  addSecret(key, secret) {
    this.#secrets.set(key, secret);
  }

  getSecret(key) {
    return this.#secrets.get(key);
  }

  #privateMethod() {
    return 'This is a private method';
  }

  revealSecret(key) {
    print(this.#privateMethod());
    return this.#secrets.get(key);
  }
}

const secrets = new SecretKeeper();
secrets.addSecret('apiKey', '12345');

 
const array1 = [1, 2, 3];
const array2 = [4, 5, ...array1];
print(array2);

const object1 = { a: 1, b: 2 };
const object2 = { b: 3, c: 4, ...object1 };
print(object2);

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const generator = fetchData(urls);
  
  for await (const { url, data, error } of generator) {
    if (error) {
      console.error(`Error fetching ${url}:`, error);
    } else {
      print(`Data from ${url}:`, data);
    }
  }
})();
