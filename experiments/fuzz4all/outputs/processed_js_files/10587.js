 
const handler = {
  get: function(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(...arguments);
  }
};

const targetObject = {
  name: "Advanced JS",
  description: "Complex usage of JavaScript features",
  async getInfo() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(`Info: ${this.name} - ${this.description}`), 1000);
    });
  }
};

const proxiedObject = new Proxy(targetObject, handler);

 
(async () => {
  print(await proxiedObject.getInfo());

   
  const { author = "Unknown Author" } = proxiedObject;
  print(`Author: ${author}`);

   
  function* counter() {
    let count = 0;
    while (count < 3) {
      yield count++;
    }
  }

   
  const counts = [...counter()];
  print("Counts:", counts);

   
  function tag(strings, ...values) {
    return strings.raw[0] + values.map((v) => v.toUpperCase()).join(", ");
  }

  const str = tag`hello, ${proxiedObject.name}, from a tagged template!`;
  print(str);
})();
