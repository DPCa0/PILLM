 
(async () => {
  if (!window.CryptoJS) {
    const { default: CryptoJS } = await import('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');
    window.CryptoJS = CryptoJS;
  }

  const originalText = "Hello, World!";
  
   
  const handler = {
    get: function(target, property) {
      print(`Accessing property '${property}'`);
      return target[property];
    }
  };
  
  const data = new Proxy({ text: originalText }, handler);

   
  const textSymbol = Symbol('text');
  const secretData = {
    [textSymbol]: data.text
  };

  print(`Original text: ${Reflect.get(secretData, textSymbol)}`);

   
  const encrypted = CryptoJS.AES.encrypt(secretData[textSymbol], 'secret key 123').toString();
  print(`Encrypted text: ${encrypted}`);

   
  async function* encryptedMessages(encryptedText, times) {
    for (let i = 0; i < times; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));  
      yield `Encrypted message ${i+1}: ${encryptedText}`;
    }
  }

   
  (async () => {
    for await (const message of encryptedMessages(encrypted, 3)) {
      print(message);
    }
  })();
})();
