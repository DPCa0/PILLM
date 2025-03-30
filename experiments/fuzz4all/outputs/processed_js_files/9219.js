 
(async () => {
  const { nanoid } = await import('https://cdn.skypack.dev/nanoid');

   
  const handler = {
    get: function(target, prop, receiver) {
      print(`Getting ${prop}...`);
      return Reflect.get(target, prop, receiver);
    },
    set: function(target, prop, value) {
      print(`Setting ${prop} to ${value}...`);
      return Reflect.set(target, prop, value);
    }
  };

  const targetObject = { name: 'JavaScript' };
  const proxy = new Proxy(targetObject, handler);

   
  print(proxy.name);
  proxy.version = 'ES2023';

   
  const privateData = new WeakMap();

  class AdvancedFeature {
    constructor(id) {
      this.id = id;
      privateData.set(this, { hiddenValue: 42 });
    }

    get hiddenValue() {
      return privateData.get(this).hiddenValue;
    }
  }

  const instance = new AdvancedFeature(nanoid());
  print(`Instance ID: ${instance.id}, Hidden Value: ${instance.hiddenValue}`);

   
  async function* fetchData() {
    let data = ['First', 'Second', 'Third'];
    for (let item of data) {
      await new Promise(resolve => setTimeout(resolve, 1000));  
      yield item;
    }
  }

  (async () => {
    for await (let item of fetchData()) {
      print(`Received: ${item}`);
    }
  })();
})();
