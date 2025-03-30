class Robot {
  #name;   
  static instances = 0;  

  constructor(name) {
    this.#name = name;
    Robot.instances++;
  }

  get name() {
    return this.#name;
  }

  static *generateNames() {
    const names = ["Robo1", "Robo2", "Robo3"];
    for (const name of names) {
      yield name;
    }
  }

  async greet() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);
    print(`Hello, I am ${this.name}`);
  }

  static async manageRobots() {
    const robots = [];
    for (const name of this.generateNames()) {
      const robot = new Robot(name);
      robots.push(robot);
      await robot.greet();
    }
    return robots;
  }

  [Symbol.iterator]() {
    let count = 0;
    const self = this;
    return {
      next() {
        return count < self.name.length 
          ? { value: self.name[count++], done: false } 
          : { done: true };
      }
    };
  }
}

 
(async () => {
  print(`Creating robots...`);
  const robots = await Robot.manageRobots();
  print(`Total robots created: ${Robot.instances}`);

  for (const robot of robots) {
    print(`Iterating through name of ${robot.name}:`);
    for (const char of robot) {
      print(char);
    }
  }
})();
