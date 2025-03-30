 
class SecretKeeper {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

  #encode(secret) {
    return [...secret].map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('');
  }

  #decode(encodedSecret) {
    return [...encodedSecret].map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
  }

  revealSecret() {
    return this.#decode(this.#secret);
  }

  static async *fibonacciSequence(limit) {
    let a = 0, b = 1;
    for (let i = 0; i < limit; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

 
const loggerHandler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

 
const secret = new SecretKeeper("khoor");
const proxiedSecret = new Proxy(secret, loggerHandler);

print(`Revealed Secret: ${proxiedSecret.revealSecret()}`);

 
(async () => {
  const limit = 10;
  print(`Fibonacci sequence up to ${limit}:`);
  for await (const number of SecretKeeper.fibonacciSequence(limit)) {
    print(number);
  }
})();
