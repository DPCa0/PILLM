class AdvancedFeatureShowcase {
  constructor(...features) {
    this.features = features;
  }

   
  #id = Symbol('id');

  static async *generateFeatures() {
    yield 'Async Iteration';
    yield 'Classes & Inheritance';
    yield 'Template Literals';
    yield 'Destructuring';
    yield 'Spread Operator';
    yield 'Map & Set';
    yield 'Promise & Async/Await';
    yield 'Proxies';
    yield 'Generators';
    yield 'Modules';
  }

  async demonstrateFeatures() {
    const generator = AdvancedFeatureShowcase.generateFeatures();
    
    for await (const feature of generator) {
      print(`Exploring: ${feature}`);
    }
  }

   
  get featureProxy() {
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          return `Accessing feature: ${target[prop]}`;
        }
        return `Feature ${prop} is not available`;
      }
    };
    return new Proxy(this.features, handler);
  }

  featureSummary() {
    return this.features.map(feature => `Feature: ${feature}`).join('\n');
  }

   
  featureStates() {
    const featureMap = new Map();
    this.features.forEach(feature => {
      featureMap.set(feature, { used: false });
    });

    return {
      setUsed(feature) {
        if (featureMap.has(feature)) {
          featureMap.get(feature).used = true;
        }
      },
      getStatus(feature) {
        return featureMap.get(feature)?.used ? 'Used' : 'Not Used';
      }
    };
  }

  static get showAlert() {
    return new Function('msg', 'alert(msg)');
  }
}

const showcase = new AdvancedFeatureShowcase('Class', 'Arrow Functions', 'Modules');

showcase.demonstrateFeatures();
print(showcase.featureProxy[0]);  
print(showcase.featureSummary());  

const states = showcase.featureStates();
states.setUsed('Class');
print(`Class is ${states.getStatus('Class')}`);

 
async function loadFeature() {
  if (Math.random() > 0.5) {
    const { feature } = await import('./dynamicFeature.js');
    feature();
  }
}

loadFeature();