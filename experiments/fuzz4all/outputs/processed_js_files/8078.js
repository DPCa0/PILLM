 
class SecretBox {
  #secretMessage;
  
  constructor(message) {
    this.#secretMessage = this.#encryptMessage(message);
  }

   
  #encryptMessage(message) {
    return [...message].map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('');
  }
  
   
  #decryptMessage(encryptedMessage) {
    return [...encryptedMessage].map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
  }
  
  revealSecret() {
    return this.#decryptMessage(this.#secretMessage);
  }
}

 
const secretBox = new SecretBox("Hello, JavaScript!");

 
async function displaySecret() {
  try {
    const secretPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: secretBox.revealSecret() });
      }, 2000);
    });
    
    const { message } = await secretPromise;
    print(`The secret message is: "${message}"`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

displaySecret();

 
const targetObject = {
  prop1: 'value1',
  prop2: 'value2'
};

const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' has been accessed`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value) {
    print(`Property '${prop}' has been set to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.prop1);
proxyObject.prop2 = 'newValue';
print(proxyObject.prop2);
