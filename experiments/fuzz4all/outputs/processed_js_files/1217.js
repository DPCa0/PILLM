 
class SecretVault {
  #vaultKey;
  #vaultContents;

  constructor(key) {
    this.#vaultKey = key;
    this.#vaultContents = new Map();
  }

  #validateAccess(key) {
    return key === this.#vaultKey;
  }

  addSecret(key, item, value) {
    if (this.#validateAccess(key)) {
      this.#vaultContents.set(item, value);
    } else {
      throw new Error("Invalid key: Access denied.");
    }
  }

  getSecret(key, item) {
    if (this.#validateAccess(key)) {
      return this.#vaultContents.get(item) || "No such item.";
    } else {
      throw new Error("Invalid key: Access denied.");
    }
  }

  static #generateRandomKey() {
    return Math.random().toString(36).substr(2, 8);
  }

  static createWithRandomKey() {
    const key = SecretVault.#generateRandomKey();
    return { vault: new SecretVault(key), key: key };
  }
}

 
async function accessVault() {
  const { vault, key } = SecretVault.createWithRandomKey();
  
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  print(`Generated Key: ${key}`);

  try {
    await delay(1000);  
    vault.addSecret(key, 'goldenIdol', 'A rare and ancient artifact');
    print('Secret added successfully.');

    await delay(500);
    const retrievedItem = vault.getSecret(key, 'goldenIdol');
    print(`Retrieved secret: ${retrievedItem}`);
  } catch (err) {
    console.error(err.message);
  }
}

accessVault();
