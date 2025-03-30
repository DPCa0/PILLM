 
const uniqueKey = Symbol('uniqueKey');

const complexObject = {
  name: 'Complex Object',
  [uniqueKey]: 'This is a unique symbol key',
  methods: {
    regularMethod() {
      print(`Name is: ${this.name}`);
    },
    async asyncMethod() {
      print('Starting async operation...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      print('Async operation completed!');
    }
  },
  nestedObject: {
    prop: 'I am nested',
    showProp() {
      print(this.prop);
    }
  }
};

 
const handler = {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      console.warn(`Property ${String(property)} does not exist`);
      return undefined;
    }
  }
};

const proxiedObject = new Proxy(complexObject, handler);

 
function* dynamicRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
(async () => {
  print(`Unique Key Access: ${proxiedObject[uniqueKey]}`);
  print('Iterating over dynamic range:');
  for await (let num of dynamicRange(1, 5)) {
    print(num);
  }

  await proxiedObject.methods.asyncMethod();
  proxiedObject.methods.regularMethod();
  proxiedObject.nestedObject.showProp();
})();

 
const { name = 'Default Name', extraInfo = {}, ...rest } = complexObject;
print(`Destructured Name: ${name}, Rest:`, rest);
