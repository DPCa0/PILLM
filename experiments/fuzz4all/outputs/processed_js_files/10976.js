 

 
const _private = Symbol('private');

 
class ComplexObject {
  constructor(value) {
    this[_private] = value;
  }
  
  getPrivateValue() {
    return this[_private];
  }
  
  setPrivateValue(value) {
    this[_private] = value;
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop} from ComplexObject`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const obj = new Proxy(new ComplexObject(42), handler);

 
print(obj.getPrivateValue());    
obj.setPrivateValue(100);             
print(obj.getPrivateValue());    
print(obj.nonExistentProperty);  
