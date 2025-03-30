 

const reactiveHandler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    }
    return undefined;
  },
  set(target, prop, value) {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    if (typeof target.render === "function") target.render();
    return true;
  }
};

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

class Model {
  constructor(data) {
    this.data = new Proxy(data, reactiveHandler);
    this.data.render = () => print(`Rendering with data: ${JSON.stringify(this.data)}`);
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      Object.assign(this.data, json);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
}

const model = new Model({ id: idGen.next().value, name: 'Initial' });
model.data.name = 'Updated';

(async () => {
  await model.fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();
