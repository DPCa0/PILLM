 
const uniqueId = Symbol('id');

 
class AdvancedObject {
  constructor(name) {
    this.name = name;
    this[uniqueId] = Math.random().toString(36).substring(2);
  }

  get id() {
    return this[uniqueId];
  }

  set id(value) {
    console.error("Cannot directly set ID");
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Modified property: ${prop}, New value: ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const obj = new Proxy(new AdvancedObject('Test Object'), handler);

 
print(`Object ID: ${obj.id}`);
obj.name = 'Updated Object Name';
print(`Object Name: ${obj.name}`);
obj.id = 'New ID';  
