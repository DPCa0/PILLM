 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
     
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
};

const targetObject = { foo: 'bar', baz: 42 };
const proxyObject = new Proxy(targetObject, handler);

 
class MyClass {
  #privateField = 'I am private';

  static staticMethod() {
    return 'I am static';
  }

  revealPrivate() {
    return this.#privateField;
  }
}

 
const obj = { a: { b: { c: 'value' } } };
const value = obj?.a?.b?.c ?? 'default value';

 
(async () => {
  const { foo, baz } = proxyObject;
  print(`foo: ${foo}, baz: ${baz}`);

  const instance = new MyClass();
  print(instance.revealPrivate());
  print(MyClass.staticMethod());

  print(`Optional chaining value: ${value}`);

   
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched data:', data);
})();
