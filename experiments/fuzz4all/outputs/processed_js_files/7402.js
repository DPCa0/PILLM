 
class SecretKeeper {
  #secrets = new WeakMap();
  
  constructor() {
    this.#secrets.set(this, []);
  }

  #logSecrets() {
    print(`Secrets: ${this.#secrets.get(this).join(', ')}`);
  }

  addSecret(secret) {
    this.#secrets.get(this).push(secret);
    this.#logSecrets();
  }

  get secretCount() {
    return this.#secrets.get(this).length;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Method ${prop} was called with arguments: ${args.join(', ')}`);
        return target[prop].apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const keeper = new Proxy(new SecretKeeper(), handler);

 
async function* revealSecretsAsync(keeper) {
  for (let i = 0; i < keeper.secretCount; i++) {
     
    await new Promise(resolve => setTimeout(resolve, 500));
    yield `Revealing secret ${i + 1}`;
  }
}

 
keeper.addSecret("The treasure is buried under the old oak tree");
keeper.addSecret("The password is swordfish");

 
(async function() {
  for await (let revelation of revealSecretsAsync(keeper)) {
    print(revelation);
  }
})();
