 
class SecretKeeper {
  #secret;
  #history = [];

  constructor(secret) {
    this.#secret = secret;
  }

   
  revealSecret() {
    const timestamp = new Date().toISOString();
    this.#recordHistory(`Secret revealed at ${timestamp}`);
    return this.#secret;
  }

  #recordHistory(event) {
    this.#history.push(event);
  }

   
  *historyIterator() {
    for (const record of this.#history) {
      yield record;
    }
  }

  getHistory() {
    return [...this.historyIterator()];
  }

   
  static async encrypt(text, key) {
    const cryptoKey = await crypto.subtle.importKey(
      "raw", 
      new TextEncoder().encode(key), 
      { name: "AES-GCM" },
      false, 
      ["encrypt"]
    );
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: new Uint8Array(12) },
      cryptoKey,
      new TextEncoder().encode(text)
    );
    return new Uint8Array(encrypted);
  }
}

 
const mySecret = new SecretKeeper('JavaScript is awesome!');

 
print(mySecret.revealSecret());

 
print(mySecret.getHistory());

 
SecretKeeper.encrypt('Hello, world!', 'mySuperSecretKey')
  .then(encrypted => console.log('Encrypted message:', encrypted))
  .catch(err => console.error('Encryption failed:', err));
