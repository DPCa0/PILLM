 
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  get fullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

  set fullName(name) {
    [this.#firstName, this.#lastName] = name.split(' ');
  }

   
  static createAnonymous() {
    return new Person("John", "Doe");
  }

   
  #greet() {
    print(`Hello, ${this.fullName}!`);
  }

  introduce() {
    this.#greet();
  }
}

 
const personHandler = {
  get(target, prop) {
    print(`Property '${prop}' was accessed`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Property '${prop}' was set to '${value}'`);
    target[prop] = value;
    return true;
  }
};

 
const dynamicProperties = new Map();

 
const dynamicProxy = new Proxy(dynamicProperties, {
  get(target, prop) {
    if (target.has(prop)) {
      return target.get(prop);
    }
    print(`Property '${prop}' not found`);
    return undefined;
  },
  set(target, prop, value) {
    target.set(prop, value);
    return true;
  }
});

 
const anonymous = Person.createAnonymous();
const proxiedPerson = new Proxy(anonymous, personHandler);

 
dynamicProxy.hobby = 'Photography';
dynamicProxy.skill = 'Coding';

 
print(proxiedPerson.fullName);  
proxiedPerson.introduce();  

 
print(`Hobby: ${dynamicProxy.hobby}`);  
print(`Skill: ${dynamicProxy.skill}`);  
