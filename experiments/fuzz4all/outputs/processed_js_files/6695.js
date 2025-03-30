 
class SecretBox {
  #secret;
  
  constructor(secret) {
    this.#secret = secret;
  }

  #revealSecret() {
    return `The secret is: ${this.#secret}`;
  }

  getSecret() {
    return this.#revealSecret();
  }
  
  static createFromJSON(json) {
    const data = JSON.parse(json);
    return new SecretBox(data.secret);
  }
}

 
async function fetchSecretBox() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  
   
  const secretData = JSON.stringify({ secret: 'Fetched_Secret_' + data.id });
  return SecretBox.createFromJSON(secretData);
}

 
async function main() {
  const tasks = [fetchSecretBox(), fetchSecretBox(), fetchSecretBox()];
  const secretBoxes = await Promise.all(tasks);

   
  const handler = {
    get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} not found`),
  };

  secretBoxes.forEach((box, index) => {
    const proxiedBox = new Proxy(box, handler);
    print(`Secret box ${index + 1}:`, proxiedBox.getSecret());
  });
}

main().catch(console.error);
