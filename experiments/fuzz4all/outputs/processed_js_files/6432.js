 
class Secretive {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

   
  revealSecret() {
    return this.#decrypt(this.#secret);
  }

   
  #decrypt(encryptedSecret) {
    return Array.from(encryptedSecret)
      .map(char => String.fromCharCode(char.charCodeAt(0) - 1))
      .join('');
  }

   
  static create(secret) {
    const encryptedSecret = Array.from(secret)
      .map(char => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('');
    return new Secretive(encryptedSecret);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'revealSecret') {
      return function() {
        print('Decoding the secret...');
        return Reflect.get(...arguments).apply(receiver);
      };
    }
    return Reflect.get(...arguments);
  }
};

const secretInstance = Secretive.create('JavaScriptRocks');
const proxiedSecretInstance = new Proxy(secretInstance, handler);

 
(async function() {
  const promises = [
    proxiedSecretInstance.revealSecret(),
    new Promise(resolve => setTimeout(() => resolve('Async operation complete!'), 1000))
  ];

  const [revealedSecret, asyncMessage] = await Promise.all(promises);
  print(revealedSecret);
  print(asyncMessage);
})();
