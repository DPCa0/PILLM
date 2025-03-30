(async () => {
  const asyncTask = () => new Promise((resolve) => setTimeout(() => resolve('Async Task Completed'), 1000));

  class AdvancedFeature {
    constructor() {
      this.map = new Map([['initialKey', 'initialValue']]);
    }

    async *generateAsyncSequence() {
      for (let i = 0; i < 3; i++) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        yield i;
      }
    }

    getProxy() {
      return new Proxy(this.map, {
        get(target, prop) {
          if (prop === 'showAll') {
            return [...target.entries()];
          }
          return target.get(prop);
        },
        set(target, prop, value) {
          target.set(prop, value);
          print(`Property ${String(prop)} set to ${value}`);
          return true;
        },
      });
    }

    applyRegex(input) {
      const regex = /(\w+)\s(\w+)/;
      return input.replace(regex, '$2, $1');
    }
  }

  const advancedInstance = new AdvancedFeature();
  const proxyMap = advancedInstance.getProxy();
  
  print(proxyMap.initialKey);
  proxyMap.newKey = 'newValue';
  print(proxyMap.showAll);

  print(advancedInstance.applyRegex('Hello World'));

  for await (const value of advancedInstance.generateAsyncSequence()) {
    print(`Generated: ${value}`);
  }

  const result = await asyncTask();
  print(result);
})();
