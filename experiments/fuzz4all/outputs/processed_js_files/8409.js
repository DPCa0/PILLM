 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const MY_SYMBOL = Symbol('mySymbol');

 
class ComplexObject {
  #secret;  

  constructor(secret) {
    this.#secret = secret;
    this[MY_SYMBOL] = `Symbol linked to: ${secret}`;
  }

  async #secretMethod() {  
    await delay(1000);
    return `Processed: ${this.#secret}`;
  }

  async revealSecret() {
    const processedSecret = await this.#secretMethod();
    print(processedSecret);
  }

  get symbolValue() {
    return this[MY_SYMBOL];
  }
}

 
async function main() {
  const obj = new ComplexObject('mySecretValue');
  
   
  const { default: lodash } = await import('https://cdn.skypack.dev/lodash');

  const data = [4, 2, 8, 6];
  print('Sorted Data:', lodash.sortBy(data));

  await obj.revealSecret();
  print(obj.symbolValue);
}

main().catch(console.error);
