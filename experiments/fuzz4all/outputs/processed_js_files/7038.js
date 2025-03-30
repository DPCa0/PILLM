class Robot {
  static #robotCount = 0;
  
  constructor(name) {
    this.name = name;
    Robot.#robotCount++;
  }

  static get robotCount() {
    return this.#robotCount;
  }

  async introduce() {
    const greeting = await this.#fetchGreeting();
    print(`${greeting} I am ${this.name}.`);
  }

  #fetchGreeting() {
    return new Promise(resolve => setTimeout(() => resolve('Hello!'), 1000));
  }
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield `Robot-${id++}`;
  }
}

const robotFactory = (count) => {
  const generator = idGenerator();
  return Array.from({ length: count }, () => new Robot(generator.next().value));
};

(async function run() {
  const robots = robotFactory(3);
  print(`Total Robots: ${Robot.robotCount}`);
  
  for (const robot of robots) {
    await robot.introduce();
  }

  const additionalRobot = new Proxy(new Robot('ExtraBot'), {
    get(target, prop, receiver) {
      if (prop === 'introduce') {
        print(`Accessing ${prop} method`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });

  await additionalRobot.introduce();
})();
