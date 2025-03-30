 
class SecretKeeper {
  #secret;
  static secretCount = 0;

  constructor(secret) {
    this.#secret = secret;
    SecretKeeper.secretCount++;
  }

   
  #revealSecret() {
    return `The secret is: ${this.#secret}`;
  }

   
  reveal() {
    return this.#revealSecret();
  }

   
  static getSecretCount() {
    return `Secrets stored: ${SecretKeeper.secretCount}`;
  }
}

 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const handler = {
  get(target, property, receiver) {
    if (property === 'greet') {
      return () => `Hello, ${target.name}`;
    }
    return Reflect.get(...arguments);
  }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

(async () => {
   
  const secret1 = new SecretKeeper("JavaScript is fun!");
  const secret2 = new SecretKeeper("Proxies are powerful!");

  print(secret1.reveal());
  print(secret2.reveal());
  print(SecretKeeper.getSecretCount());

   
  const data = await fetchData('https://api.github.com');
  print("Fetched Data:", data);

   
  print(user.greet());  
  print(`User age: ${user.age}`);
})();
