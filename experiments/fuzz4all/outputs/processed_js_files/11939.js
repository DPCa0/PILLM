 

 
function* fetchConfig() {
  yield new Promise((resolve) => setTimeout(() => resolve({ featureA: true, limit: 5 }), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve({ featureB: false, debugMode: 'verbose' }), 1000));
}

 
const config = new Proxy({}, {
  get(target, property) {
    if (!(property in target)) {
      throw new ReferenceError(`Config property "${property}" is not defined.`);
    }
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting config property "${property}" to`, value);
    return Reflect.set(target, property, value);
  }
});

 
(async function() {
  for await (const remoteConfig of fetchConfig()) {
    for (const [key, value] of Object.entries(remoteConfig)) {
      config[key] = value;
    }
  }
  
   
  if (config.featureA) {
    print('Feature A is enabled.');
  }
  if (config.featureB) {
    print('Feature B is enabled.');
  }
  print(`Running in ${config.debugMode || 'normal'} mode with a limit of ${config.limit || 'unlimited'}.`);
})();

