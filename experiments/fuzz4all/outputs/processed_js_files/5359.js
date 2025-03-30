 
class SecretVault {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

   
  #encrypt(data) {
    return [...data].reverse().join('');
  }

   
  reveal() {
    return this.#encrypt(this.#secret);
  }

   
  static async generateSecret() {
    const crypto = await import('crypto');
    return crypto.randomBytes(16).toString('hex');
  }
}

 
(async () => {
   
  const potentialSecret = { hidden: { value: '42' } };
  const secretValue = potentialSecret.hidden?.value ?? 'default_secret';

  const secretVault = new SecretVault(secretValue);

  print('Encrypted Secret:', secretVault.reveal());

   
  const [generatedSecret] = await Promise.all([
    SecretVault.generateSecret()
  ]);

  print('Generated Secret:', generatedSecret);

   
  const handler = {
    get(target, prop, receiver) {
      if (prop === 'secret') {
        return Reflect.get(target, prop, receiver).toUpperCase();
      }
      return Reflect.get(target, prop, receiver);
    }
  };

  const proxyVault = new Proxy(secretVault, handler);
  print('Proxy Encrypted Secret:', proxyVault.reveal());
})();
