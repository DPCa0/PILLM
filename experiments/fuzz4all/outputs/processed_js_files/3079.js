 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`Accessed property '${prop}'`);
      return Reflect.get(...arguments);
    }
    return `Property '${prop}' not found.`;
  }
};

 
const observedObject = new Proxy({
  name: 'JavaScript',
  year: 1995
}, handler);

 
function* featureGenerator() {
  yield 'Proxies';
  yield 'Generators';
  yield 'Async/Await';
}

 
async function showcaseFeatures() {
  for (let feature of featureGenerator()) {
    print(`Feature: ${feature}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  print(`The language is ${observedObject.name} and was released in ${observedObject.year}.`);
}

 
showcaseFeatures();
