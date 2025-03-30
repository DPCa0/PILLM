 
class ComplexUtility {
  #secretKey;
  #data;

  constructor(key, data) {
    this.#secretKey = key;
    this.#data = data;
  }

   
  #encrypt(data) {
    return [...data].map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ this.#secretKey[i % this.#secretKey.length].charCodeAt(0))
    ).join('');
  }

   
  getEncryptedData() {
    return this.#encrypt(this.#data);
  }

   
  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    } else {
      return `Property ${prop} not found`;
    }
  }
};

const target = {
  name: 'Advanced JavaScript',
  type: 'Program'
};

const proxy = new Proxy(target, handler);

print(proxy.name);   
print(proxy.nonExistentProperty);   

 
const uniqueID = Symbol('id');
const obj = {
  [uniqueID]: 12345,
  name: 'Example Object'
};

print('Unique ID:', obj[uniqueID]);

 
const utility = new ComplexUtility('mySecretKey', 'Sensitive Data');
print('Encrypted Data:', utility.getEncryptedData());

 
ComplexUtility.fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => {
  print('Fetched Data:', data);
});
