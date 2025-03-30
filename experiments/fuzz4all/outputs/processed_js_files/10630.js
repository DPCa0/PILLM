 
class SecretKeeper {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

  #encrypt(value) {
    return [...value].map(char => String.fromCharCode(char.charCodeAt() + 1)).join('');
  }

  #decrypt(value) {
    return [...value].map(char => String.fromCharCode(char.charCodeAt() - 1)).join('');
  }

  reveal() {
    return `The secret is: ${this.#decrypt(this.#secret)}`;
  }

  static async #fetchSecret() {
     
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('UJNFT');
      }, 1000);
    });
  }

  static async create() {
    const fetchedSecret = await this.#fetchSecret();
    return new SecretKeeper(fetchedSecret);
  }
}

 
(async () => {
  try {
    const secretKeeper = await SecretKeeper.create();
    print(secretKeeper.reveal());
  } catch (error) {
    console.error('Error:', error);
  }
})();
