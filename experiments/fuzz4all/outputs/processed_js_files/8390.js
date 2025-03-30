 
const ComplexModule = (() => {
  const privateData = new WeakMap();

  class AdvancedFeature {
    constructor(data) {
      const details = { data, updatedAt: new Date() };
      privateData.set(this, details);
    }

    async processData(callback) {
       
      const result = await new Promise((resolve) => setTimeout(() => resolve(callback(privateData.get(this).data)), 1000));
      this.updateTimestamp();
      return result;
    }

    updateTimestamp() {
      privateData.get(this).updatedAt = new Date();
    }

    getMetadata() {
      const { data, updatedAt } = privateData.get(this);
      return { data, updatedAt: updatedAt.toLocaleString() };
    }
  }

  return {
    create: (data) => new AdvancedFeature(data)
  };
})();

 
const instance = ComplexModule.create([1, 2, 3, 4]);

 
instance.processData(data => data.map(num => num ** 2))
  .then(result => {
    print('Processed Data:', result);
    print('Metadata:', instance.getMetadata());
  })
  .catch(error => console.error('Error:', error));

 
function demoDestructuring(...args) {
  const [first, ...rest] = args;
  print(`First Element: ${first}`);
  print(`Rest of Elements: ${rest}`);
}

demoDestructuring('a', 'b', 'c', 'd');
