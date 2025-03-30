 
class Advanced {
  #secret;  
  static count = 0;

  constructor(secret) {
    this.#secret = secret;
    Advanced.incrementCount();
  }

   
  get revealSecret() {
    return this.#secret;
  }

   
  static incrementCount() {
    Advanced.count++;
  }
  
   
  async showMessage() {
    const message = await new Promise((resolve) => {
      setTimeout(() => resolve(`The secret is: ${this.revealSecret}`), 1000);
    });
    print(message);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} not found.`);
      return undefined;
    }
  }
};

const secretAgent = new Advanced("Code 007");
const proxyAgent = new Proxy(secretAgent, handler);

 
function tag(strings, ...values) {
  return strings.raw.reduce((acc, str, index) => acc + str + (values[index] || ''), '');
}

const message = tag`Agent status: Secret is: ${proxyAgent.revealSecret}`;

 
(async () => {
  print(`Agent Count: ${Advanced.count}`);
  print(message);
  await proxyAgent.showMessage();
})();
