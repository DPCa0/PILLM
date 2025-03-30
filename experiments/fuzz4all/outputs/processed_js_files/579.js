 
class SecretVault {
  constructor(secret) {
    this._secret = secret;
  }
  
  revealSecret() {
    return `The secret is: ${this._secret}`;
  }
}

 
const vaultHandler = {
  get(target, prop, receiver) {
    if (prop === 'revealSecret') {
       
      return Reflect.get(target, prop, receiver);
    }
    return 'Access Denied';
  },
  set(target, prop, value) {
    if (prop.startsWith('_')) {
      print('Attempt to modify private property detected!');
      return false;
    }
    target[prop] = value;
    return true;
  }
};

 
const vault = new Proxy(new SecretVault("I love programming!"), vaultHandler);

print(vault.revealSecret());  
print(vault._secret);        

 
async function* asyncGenerator() {
  for (let i = 0; i < 5; i++) {
    yield new Promise((resolve) => setTimeout(() => resolve(i), 1000));
  }
}

(async () => {
  const iterator = asyncGenerator();

  for await (const num of iterator) {
    print(`Processed number: ${num}`);
  }
})();

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i - 1];
    return `${result}${string.toUpperCase()}${value ? value : ''}`;
  });
}

const name = 'Alice';
const age = 25;

print(tag`Hello ${name}, you are ${age} years old.`); 
 
