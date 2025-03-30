 
class Crypto {
   
  #key;

  constructor(key) {
    this.#key = key;
  }

   
  *encrypt(data) {
    for (let char of data) {
      yield String.fromCharCode(char.charCodeAt(0) ^ this.#key);
    }
  }

   
  static generate() {
    const randomKey = Math.floor(Math.random() * 256);
    return new Crypto(randomKey);
  }
}

 
async function fetchDataAndEncrypt(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
     
    const textData = await response.text();
    
     
    const crypto = Crypto.generate();
    
     
    const encryptedData = [...crypto.encrypt(textData)].join('');
    
    print('Encrypted Data:', encryptedData);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting the ${prop} property`);
    return Reflect.get(...arguments);
  }
};

 
const cryptoInstance = new Proxy(new Crypto(128), handler);

 
print([...cryptoInstance.encrypt('Hello World!')].join(''));

 
fetchDataAndEncrypt('https://jsonplaceholder.typicode.com/posts/1');
