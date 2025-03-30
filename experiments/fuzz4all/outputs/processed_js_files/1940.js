 
(async () => {
  const { createHash } = await import('crypto');

   
  const handler = {
    get: (target, prop, receiver) => {
      print(`Property ${String(prop)} accessed`);
      return Reflect.get(target, prop, receiver);
    }
  };

   
  class SecureData {
    #secret;

    constructor(secret) {
      this.#secret = secret;
    }

    getSecret() {
      return this.#secret;
    }

     
    static hashSecret = (secret) => {
      const hash = createHash('sha256');
      hash.update(secret);
      return hash.digest('hex');
    };
  }

   
  const getData = async () => {
    const data = new SecureData('SuperSecret123');
    const proxiedData = new Proxy(data, handler);
    print(`Hashed Secret: ${SecureData.hashSecret(proxiedData.getSecret())}`);
  };

   
  await Promise.all([getData(), getData()]);

   
  function tag(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
  }

  const name = 'world';
  print(tag`Hello, ${name}!`);
})();
