 
class SecretNumber {
  #secret;  

  constructor() {
    this.#secret = Math.floor(Math.random() * 100);  
  }

   
  #reveal() {
    return `The secret number is ${this.#secret}.`;
  }

   
  getRevealer() {
    const handler = {
      apply: (target, thisArg, args) => {
        print("Revealing the secret...");
        return Reflect.apply(target, thisArg, args);
      }
    };
    return new Proxy(this.#reveal, handler);
  }
}

 
(async () => {
  const secret = new SecretNumber();

   
  const { default: moment } = await import('https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js');

   
  await new Promise(resolve => setTimeout(resolve, 1000));

   
  const tag = (strings, ...values) => {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
  };

  print(tag`The current date and time is: ${moment().format('LLLL')}`);

   
  const revealSecret = secret.getRevealer();
  print(revealSecret());
})();
