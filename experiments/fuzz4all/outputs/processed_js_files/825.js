 
class SecretContainer {
  #secretData;
  #revealSecret() {
    return `The secret is: ${this.#secretData}`;
  }

  constructor(secret) {
    this.#secretData = secret;
  }

  getSecret(usingPassword) {
    return usingPassword === 'openSesame' ? this.#revealSecret() : 'Access Denied!';
  }
}

 
async function loadSecretModule() {
  try {
    const { default: fetchSecret } = await import('./fetchSecret.js');
    const secretValue = await fetchSecret();
    const container = new SecretContainer(secretValue);
    print(container.getSecret('openSesame'));  
  } catch (error) {
    console.error('Error loading secret module:', error);
  }
}

 
const targetObj = {
  message: 'Hello, Proxy!',
};

const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' was accessed.`);
    return Reflect.get(target, prop);
  },
};

const proxiedObject = new Proxy(targetObj, handler);
print(proxiedObject.message);  

 
const generatorExample = (function* () {
  yield* [1, 2, 3, 4, 5];
})();

const numbersArray = [...generatorExample];
print(numbersArray);  

 
loadSecretModule();
