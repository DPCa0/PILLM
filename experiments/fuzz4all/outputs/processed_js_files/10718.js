class AdvancedFeatureDemo {
  #privateField = 'This is a private field';
  constructor(name) {
    this.name = name;
  }

  async *generator() {
    for (let i = 0; i < 5; i++) {
      yield await this.delayedLog(i);
    }
  }

  delayedLog(i) {
    return new Promise((resolve) => {
      setTimeout(() => {
        print(`Logging: ${i}`);
        resolve(i);
      }, 1000);
    });
  }

  static async runDemo() {
    const demo = new AdvancedFeatureDemo('Demo');
    print(`Instance created with name: ${demo.name}`);
    print(demo.#privateField);

    for await (const num of demo.generator()) {
      print(`Received from generator: ${num}`);
    }
  }
}

(async () => {
  const promise1 = Promise.resolve(3);
  const promise2 = new Promise((resolve) =>
    setTimeout(() => resolve(42), 100)
  );
  const promise3 = new Promise((resolve) =>
    setTimeout(() => resolve('foo'), 500)
  );

  const result = await Promise.any([promise1, promise2, promise3]);
  print(`Promise.any resolved with: ${result}`);

  const obj = {
    firstName: 'John',
    lastName: 'Doe',
  };

  const fullName = new Proxy(obj, {
    get(target, property) {
      if (property === 'fullName') {
        return `${target.firstName} ${target.lastName}`;
      }
      return target[property];
    },
  });

  print(`Full Name via Proxy: ${fullName.fullName}`);

  await AdvancedFeatureDemo.runDemo();
})();
