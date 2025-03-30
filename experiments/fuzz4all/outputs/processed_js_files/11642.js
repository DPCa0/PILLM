 
async function* asyncNumberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop === Symbol.asyncIterator) {
      return async function* () {
        for await (const num of target) {
          print(`Yielded: ${num}`);
          yield num * 2;  
        }
      };
    }
    return Reflect.get(target, prop);
  }
};

 
const enhancedGenerator = new Proxy(asyncNumberGenerator(5), handler);

(async function() {
  for await (const num of enhancedGenerator) {
    print(`Transformed: ${num}`);
  }
})();

 
const exampleObject = {
  data: {
    nested: null
  }
};

const value = exampleObject.data.nested?.value ?? 'Default Value';
print(`Optional Chaining & Nullish Coalescing Result: ${value}`);
