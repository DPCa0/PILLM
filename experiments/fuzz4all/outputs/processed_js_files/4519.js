 
class SecretiveCalculator {
  #secretNumber;

  constructor(secretNumber) {
    this.#secretNumber = secretNumber;
  }

  #addSecret(num) {
    return num + this.#secretNumber;
  }

  #subtractSecret(num) {
    return num - this.#secretNumber;
  }

  performOperation(num, operation) {
    return operation === 'add' ? this.#addSecret(num) : this.#subtractSecret(num);
  }
}

 
const handler = {
  get(target, property, receiver) {
    if (property.startsWith('_')) {
      throw new Error(`Access to private property/method '${property}' is not allowed`);
    }
    return Reflect.get(target, property, receiver);
  }
};

const secretCalculator = new SecretiveCalculator(42);
const protectedCalculator = new Proxy(secretCalculator, handler);

 
async function demoAsyncCalculator() {
  try {
    print('Addition Result:', await Promise.resolve(protectedCalculator.performOperation(10, 'add')));
    print('Subtraction Result:', await Promise.resolve(protectedCalculator.performOperation(10, 'subtract')));
  } catch (err) {
    console.error(err);
  }
}

 
(async function() {
  try {
     
    const momentModule = await import('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js');
    print('Current Date and Time:', momentModule.default().format('MMMM Do YYYY, h:mm:ss a'));

    await demoAsyncCalculator();
  } catch (error) {
    console.error('Failed to load module or execute function:', error);
  }
})();
