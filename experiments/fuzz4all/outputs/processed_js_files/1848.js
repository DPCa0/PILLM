 
class SecretBox {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

  revealSecret() {
    return this.#secret;
  }
}

 
async function fetchSecret() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("This is a secret message!"), 1000);
  });
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
function manipulateData(...args) {
  const [first, ...rest] = args;
  return { first, rest };
}

(async () => {
  const proxyBox = new Proxy(new SecretBox("Proxy Secret"), handler);
  
  print(proxyBox.revealSecret());

  const secret = await fetchSecret();
  print(secret);

  const manipulated = manipulateData(1, 2, 3, 4, 5);
  print(manipulated);

  proxyBox.revealSecret = "New Secret";
  print(proxyBox.revealSecret);
})();
