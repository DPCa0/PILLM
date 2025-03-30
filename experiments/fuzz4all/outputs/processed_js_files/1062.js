 

 
class SecureVault {
  #secret;
  #key;

  constructor(secret, key) {
    this.#secret = secret;
    this.#key = key;
  }

   
  #decrypt(encrypted, key) {
    return [...encrypted].map(char => String.fromCharCode(char.charCodeAt() ^ key)).join('');
  }

   
  reveal(key) {
    if (this.#key === key) {
      return this.#decrypt(this.#secret, key);
    }
    throw new Error('Invalid Key');
  }

   
  static createVault(secret, key) {
    const encryptedSecret = [...secret].map(char => String.fromCharCode(char.charCodeAt() ^ key)).join('');
    return new SecureVault(encryptedSecret, key);
  }
}

 
async function accessVault() {
  const vault = SecureVault.createVault('TopSecretMessage', 42);
  try {
    const message = await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(vault.reveal(42));
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
    print(`The secret message is: ${message}`);
  } catch (error) {
    console.error(error.message);
  }
}

 
function* generateNumbers(limit) {
  let count = 0;
  while (count < limit) {
    yield count++;
  }
}

 
const numberSet = new Set(generateNumbers(5));

accessVault();

 
const [first, second, ...rest] = numberSet;
print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
