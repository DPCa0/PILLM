 
const _privateField = Symbol('privateField');
const _privateMethod = Symbol('privateMethod');

class AdvancedFeatures {
  constructor(value) {
    this[_privateField] = value;
  }

   
  async publicMethod() {
    print('Running async operations...');
    const result = await this[_privateMethod]();
    print(`Async result: ${result}`);
  }

   
  [_privateMethod]() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this[_privateField] ** 2);
      }, 1000);
    });
  }

   
  static staticField = 'I am a static field';

   
  get [`get${_privateField.toString()}`]() {
    return this[_privateField];
  }

  set [`set${_privateField.toString()}`](value) {
    this[_privateField] = value;
  }
}

 
const handler = {
  get: function (target, property) {
    if (property === 'special') {
      return 'This is a special proxy handler property';
    }
    return Reflect.get(target, property);
  },
};

const instance = new AdvancedFeatures(5);
const proxiedInstance = new Proxy(instance, handler);

print(proxiedInstance.getSymbolPrivateField);  
proxiedInstance.publicMethod();  
print(proxiedInstance.special);  

 
function tag(strings, ...values) {
  print(strings, values);
  return strings.reduce((result, string, i) => `${result}${string}${values[i] || ''}`, '');
}

const name = 'JavaScript';
const language = 'advanced features';
const message = tag`This is an example of ${name} using ${language}.`;
print(message);

 
import { square } from './mathUtils.js';  

print(`Squared result: ${square(3)}`);
