 
class SecretHolder {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

   
  getSecretHint() {
    return `The secret starts with: ${this.#secret[0]}`;
  }

   
  #processSecret() {
    return [...this.#secret].reverse().join('');
  }

   
  revealSecret(password) {
    if (this.#validatePassword(password)) {
      return `Revealed Secret: ${this.#processSecret()}`;
    }
    return 'Incorrect password!';
  }

   
  static #validatePassword(password) {
    return password === 'opensesame';
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === 'revealSecret') {
      print('Attempting to reveal secret...');
    }
    return Reflect.get(...arguments);
  },
};

 
const secretHolder = new Proxy(new SecretHolder('JavaScriptRocks'), handler);

 
print(secretHolder.getSecretHint());
print(secretHolder.revealSecret('wrongpassword'));
print(secretHolder.revealSecret('opensesame'));

 
(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  print(await secretHolder.revealSecret('opensesame'));
})();
