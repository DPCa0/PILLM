 
const advancedObject = {
  name: "ComplexObject",
  properties: {
    asyncData: async function() {
       
      return await new Promise(resolve => setTimeout(() => resolve("Data Loaded"), 1000));
    },
    computed: new Proxy({}, {
      get(target, prop) {
        if (!target[prop]) {
          target[prop] = prop.split('').reverse().join('');
        }
        return target[prop];
      }
    }),
    symbolKey: Symbol("unique")
  },
  *generator() {
    let index = 0;
    while (index < 3) {
      yield `Yielded Value: ${++index}`;
    }
  }
};

 
const { name, properties: { asyncData, computed } } = advancedObject;

 
(async () => {
  print(`Object Name: ${name}`);

   
  print(`Computed Property: ${computed.hello}`);

   
  print(await asyncData());

   
  for (let value of advancedObject.generator()) {
    print(value);
  }
})();
