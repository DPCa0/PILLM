 
class SecretKeeper {
  #secret;  

  constructor(secret) {
    this.#secret = secret;
  }

   
  revealSecret() {
    print(this.#getSecret());
  }

   
  #getSecret() {
    return `The secret is: ${this.#secret}`;
  }
}

 
const handler = {
  get(target, propKey) {
    const origMethod = target[propKey];
    if (typeof origMethod === 'function') {
      return function (...args) {
        print(`Called ${propKey} with arguments: ${JSON.stringify(args)}`);
        return origMethod.apply(this, args);
      };
    }
    return origMethod;
  },
};

 
async function asyncOperation() {
  return new Promise((resolve) => setTimeout(() => resolve('Async Value'), 2000));
}

async function displayAsyncValue() {
  const value = await asyncOperation();
  print(`Received: ${value}`);
}

 
(async function main() {
  const secretKeeper = new SecretKeeper('JavaScript is awesome');
  const proxiedSecretKeeper = new Proxy(secretKeeper, handler);

  proxiedSecretKeeper.revealSecret();
  await displayAsyncValue();
})();
