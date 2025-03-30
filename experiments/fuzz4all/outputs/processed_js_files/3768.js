 
async function complexJSFeatureExample() {
   
  class SecretKeeper {
    #secret;

    constructor(secret) {
      this.#secret = secret;
    }

    #revealSecret() {
      return this.#secret;
    }

    getSecret() {
      return this.#revealSecret();
    }
  }

  const mySecretKeeper = new SecretKeeper('The owl hoots at midnight.');

   
  async function getSecretMessage() {
    const { format } = await import('date-fns');
    const message = mySecretKeeper.getSecret();
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    return `${formattedDate}: ${message}`;
  }

   
  const handler = {
    get(target, property, receiver) {
      print(`Accessing property "${property}"`);
      return Reflect.get(target, property, receiver);
    }
  };

  const secretProxy = new Proxy(mySecretKeeper, handler);

  print('Secret through Proxy:', secretProxy.getSecret());

   
  function tag(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
  }

  const username = 'Agent47';
  const location = 'unknown';
  const taggedMessage = tag`User ${username} is currently at ${location}.`;

  print(taggedMessage);

   
  const uniqueItems = new Set([1, 2, 3, 4, 4, 5]);
  print('Unique items in set:', [...uniqueItems]);

   
  const secretMessage = await getSecretMessage();
  print('Secret Message:', secretMessage);
}

 
complexJSFeatureExample().catch(console.error);
