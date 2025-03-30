 

 
class SecretContainer {
  #secret;  
  
  constructor(secret) {
    this.#secret = secret;
  }
  
  #revealSecret() {  
    return `The secret is: ${this.#secret}`;
  }
  
  exposeSecret() {
    return this.#revealSecret();
  }
}

 
const secretProxyHandler = {
  get(target, prop) {
    if (prop === 'secret') {
      return target.exposeSecret();  
    }
    return target[prop];
  }
};

 
const mySecretContainer = new SecretContainer('JavaScript is awesome!');

 
const proxy = new Proxy(mySecretContainer, secretProxyHandler);

 
async function complexOperation() {
  try {
     
    const results = await Promise.allSettled([
      Promise.resolve(1),
      Promise.reject(new Error('This failed')),
      Promise.resolve(3)
    ]);
    
     
    const values = results.flatMap(result => 
      result.status === 'fulfilled' ? [result.value] : []
    );
    
     
    print(proxy.secret);
    
     
    const sum = await values.reduce(async (accPromise, value) => {
      const acc = await accPromise;
      return acc + value;
    }, Promise.resolve(0));
    
    print('The sum of resolved values:', sum);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

complexOperation();
