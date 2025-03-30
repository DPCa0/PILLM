 
class ComplexObject {
  constructor(name) {
    this.name = name;
  }

  async complexOperation() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Operation completed by ${this.name}`), 1000);
    });
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'name') {
      return `Wrapped ${Reflect.get(...arguments)}`;
    }
    return Reflect.get(...arguments);
  }
};

async function performOperations() {
  const object = new Proxy(new ComplexObject('Alice'), handler);
  
  try {
    print(`Initiating: ${object.name}`);
    const result = await object.complexOperation();
    print(result);
  } catch (error) {
    console.error('Error during operation:', error);
  }
}

performOperations();
