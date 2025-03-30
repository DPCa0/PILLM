 
class AdvancedFeature {
  #privateField = "I am private";
  
  constructor(value) {
    this.publicField = value;
  }

  static createInstance(value) {
    return new AdvancedFeature(value);
  }
  
  #privateMethod() {
    return `${this.#privateField} but accessible within private method`;
  }

  combinedInfo() {
    return `${this.publicField} & ${this.#privateMethod()}`;
  }
}

 
const uniqueProperty = Symbol('uniqueProperty');

 
const handler = {
  set: function(obj, prop, value) {
    if (prop === 'publicField' && typeof value !== 'string') {
      throw new TypeError('publicField must be a string');
    }
    obj[prop] = value;
    return true;
  }
};

 
const app = (() => {
  const instance = new Proxy(AdvancedFeature.createInstance("Public Info"), handler);
  instance[uniqueProperty] = "Symbolic uniqueness";
  
   
  function* infoGenerator() {
    yield instance.publicField;
    yield instance.combinedInfo();
    yield instance[uniqueProperty];
  }

   
  const [publicInfo, combinedInfo, symbolInfo] = infoGenerator();

  return {
    publicInfo,
    combinedInfo,
    symbolInfo
  };
})();

 
function tag(strings, ...expressions) {
  return strings.reduce((acc, str, i) => `${acc}${str}<${expressions[i] || ''}>`, '');
}

print(tag`Public Info: ${app.publicInfo}`);
print(tag`Combined Info: ${app.combinedInfo}`);
print(tag`Symbol Info: ${app.symbolInfo}`);
