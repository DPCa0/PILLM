 
const _privateProperty = Symbol('privateProperty');

 
class ComplexClass {
  constructor(value) {
    this[_privateProperty] = value;
  }

   
  getProxy() {
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop === 'computed') {
          return target[_privateProperty] * 2;
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        if (prop === 'computed') {
          console.error('Cannot set computed property');
          return false;
        }
        target[prop] = value;
        return true;
      },
      has: (target, prop) => {
        if (prop === 'computed') {
          return true;
        }
        return prop in target;
      }
    });
  }
}

 
(async () => {
   
  const { add } = await import('https://cdn.jsdelivr.net/npm/mathjs@9.5.2/lib/browser/math.js');
  
  const instance = new ComplexClass(42);
  const proxiedInstance = instance.getProxy();
  
  print('Private property access attempt:', proxiedInstance[_privateProperty]);  
  print('Computed property:', proxiedInstance.computed);  

   
  print('Dynamic import - add:', add(10, 32));  
  
   
  print('Has computed:', 'computed' in proxiedInstance);  

   
  proxiedInstance.computed = 100;  

   
  function tag(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str.toUpperCase()}${values[i] || ''}`, '');
  }

  print(tag`Private property value is ${instance[_privateProperty]}`);
})();
