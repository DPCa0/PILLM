 
class SecretKeeper {
  #secrets = new Map();
  
  constructor(owner) {
    this.owner = owner;
  }
  
  addSecret(key, value) {
    this.#secrets.set(key, value);
  }
  
  getSecret(key) {
    return this.#secrets.get(key);
  }
  
  #encrypt(value) {
    return [...value].map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('');
  }
  
  revealSecrets() {
    const encrypted = Array.from(this.#secrets.entries()).map(
      ([key, value]) => `${key}: ${this.#encrypt(value)}`
    );
    return encrypted.join('\n');
  }
}

 
const handler = {
  get: function(obj, prop) {
    if (prop === 'getSecret') {
      return (...args) => {
        console.warn('Accessing secret!');
        return obj[prop](...args);
      };
    }
    return obj[prop];
  }
};

 
const mySecrets = new SecretKeeper('Alice');
const proxiedSecrets = new Proxy(mySecrets, handler);

proxiedSecrets.addSecret('code', '1234');
proxiedSecrets.addSecret('password', 's3cr3t');

print(proxiedSecrets.getSecret('code'));   
print(proxiedSecrets.revealSecrets());   

 
(async function fetchData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => resolve('Fetched data after 2 seconds'), 2000);
  });
  print(data);
})();
