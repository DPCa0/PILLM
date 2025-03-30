 
const hidden = Symbol('hiddenProperty');

 
class AdvancedGadget {
  #privateVar = 42;  

  constructor(name) {
    this.name = name;
    this.features = new Set();  
    this[hidden] = 'This is a hidden message';
  }

   
  getPrivateVar() {
    return this.#privateVar;
  }

   
  static greet() {
    print('Welcome to the future!');
  }

   
  async addFeature(feature) {
    await new Promise((resolve) => setTimeout(resolve, 100));  
    this.features.add(feature);
  }

   
  *featureGenerator() {
    for (let feature of this.features) {
      yield feature;
    }
  }

   
  revealHidden() {
    return this[hidden];
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const gadget = new AdvancedGadget('SuperPhone');
const proxyGadget = new Proxy(gadget, handler);

(async () => {
  AdvancedGadget.greet();
  await proxyGadget.addFeature('AI Assistant');
  await proxyGadget.addFeature('Holographic Display');
  
  print('Private variable:', proxyGadget.getPrivateVar());
  print('Revealed hidden property:', proxyGadget.revealHidden());
  
  print('Features:');
  for (let feature of proxyGadget.featureGenerator()) {
    print(`- ${feature}`);
  }
})();
