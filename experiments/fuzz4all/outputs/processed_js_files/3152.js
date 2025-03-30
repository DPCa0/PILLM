 
class AdvancedGizmo {
  #secret;  
  constructor(name) {
    this.name = name;
    this.#secret = Math.random();
  }

   
  static async create(name) {
    const instance = new AdvancedGizmo(name);
    await instance.#initialize();
    return instance;
  }

   
  async compute(value) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Computed ${value * this.#secret}`);
      }, 1000);
    });
  }

   
  async #initialize() {
    const initData = await new Promise((resolve) =>
      setTimeout(() => resolve(`Initialized ${this.name}`), 500)
    );
    print(initData);
  }

   
  *getDetails() {
    yield `Name: ${this.name}`;
    yield `Secret: ${this.#secret}`;
  }
}

 
(async () => {
  const gizmo = await AdvancedGizmo.create('Gadget');
  print(await gizmo.compute(42));
  const details = gizmo.getDetails();
  print(details.next().value);
  print(details.next().value);
})();
