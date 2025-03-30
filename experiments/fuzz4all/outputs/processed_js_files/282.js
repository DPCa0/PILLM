 
class SecretKeeper {
  #secret;
  #getSecret() {
    return this.#secret;
  }
  
  constructor(secret) {
    this.#secret = secret;
  }

  revealSecret() {
    return this.#getSecret();
  }
}

 
async function fetchAndProcessData() {
  const dataPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });

  const response = await dataPromise;
  const processedData = response.data.map(x => x * 2);
  return processedData;
}

 
const dynamicObject = { a: 1, b: 2 };
const handler = {
  get: (target, prop) => prop in target ? target[prop] : `Property ${prop} does not exist`
};

const proxiedObject = new Proxy(dynamicObject, handler);

 
(async () => {
  const secretKeeper = new SecretKeeper('TopSecret123');
  print(`The secret is: ${secretKeeper.revealSecret()}`);

  const processedData = await fetchAndProcessData();
  print(`Processed data: ${processedData}`);

  print(proxiedObject.a);  
  print(proxiedObject.nonExistentProperty);  
})();
