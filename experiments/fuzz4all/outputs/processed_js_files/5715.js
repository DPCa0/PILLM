 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}": ${target[prop]}`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist.`);
    }
  },
  set: (target, prop, value) => {
    print(`Setting property "${prop}" to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
class SecretBox {
  #secret;
  
  constructor(secret) {
    this.#secret = secret;
  }

  reveal() {
    return this.#secret;
  }

  static greet() {
    return 'Greetings from SecretBox!';
  }
}

 
const apiURL = 'https://api.github.com/users/octocat';
const proxiedObject = new Proxy({ name: 'Octocat', age: 8 }, handler);
const secretInstance = new SecretBox('top-secret');

 
(async () => {
   
  const userData = await fetchData(apiURL);
  print('User Data:', userData);

   
  print(proxiedObject.name);
  proxiedObject.location = 'GitHub';
  
   
  print(SecretBox.greet());
  print('Secret:', secretInstance.reveal());
})();
