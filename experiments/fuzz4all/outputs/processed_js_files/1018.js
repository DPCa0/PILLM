 

 
const ComplexModule = (() => {
   
  let secretValue = 42;

   
  function* privateGenerator() {
    yield* [secretValue, secretValue * 2, secretValue * 3];
  }

   
  const publicAPI = {
    calculate: ({ multiplier, ...rest }) => {
      const [x, y, z] = privateGenerator();
      return { ...rest, results: [x, y, z].map(num => num * multiplier) };
    },
    asyncOperation: async (val) => {
       
      return new Promise((resolve) => setTimeout(() => resolve(val + secretValue), 1000));
    }
  };

  return publicAPI;
})();

 
const state = new Proxy(
  { counter: 0 },
  {
    set(target, property, value) {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    },
  }
);

 
console.log(
  ComplexModule.calculate({ multiplier: 10, additionalInfo: 'test' })
);

ComplexModule.asyncOperation(10).then(result => print(`Async result: ${result}`));

 
state.counter = 1;
state.counter = 2;

 
const mapExample = new Map();
mapExample.set('key1', 'value1');

const setExample = new Set([1, 2, 3]);
setExample.add(4);

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, index) => `${acc}${str}<${values[index] || ''}>`, '');
}

const taggedResult = tag`This is ${'tagged'} template literal`;
print(taggedResult);
