 
class Secret {
  #secretValue;
  static #hiddenStatic() {
    return "This is a static hidden secret!";
  }

  constructor(value) {
    this.#secretValue = value;
  }

  #revealSecret() {
    return `The secret is: ${this.#secretValue}`;
  }

   
  static createSecret(value) {
    const instance = new Secret(value);
    return new Proxy(instance, {
      get(target, prop) {
        if (prop === 'reveal') {
          return target.#revealSecret.bind(target);
        }
        return undefined;
      }
    });
  }

  static showStaticSecret() {
    return this.#hiddenStatic();
  }
}

 
async function handleSecret() {
  const secretAgent = Secret.createSecret('classified information');

   
  print(secretAgent.reveal());

   
  const delayedMessage = new Promise((resolve) => {
    setTimeout(() => resolve(Secret.showStaticSecret()), 1000);
  });

  print(await delayedMessage);
}

handleSecret();
