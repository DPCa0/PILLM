 
class Superhero {
  #identity;
  #energy = 100;

  constructor(name, alias) {
    this.name = name;
    this.#identity = alias;
  }

  #updateEnergy(amount) {
    this.#energy = Math.max(0, Math.min(this.#energy + amount, 100));
  }

  performAction(action) {
    if (this.#energy > 0) {
      print(`${this.name} is ${action}...`);
      this.#updateEnergy(-10);
    } else {
      print(`${this.name} is too tired to perform actions.`);
    }
  }

  revealIdentity() {
    print(`My real identity is ${this.#identity}`);
  }

  get energyStatus() {
    return `Energy level is at ${this.#energy}%`;
  }
}

 
async function heroMission(superhero, action) {
  print("Mission started...");
  try {
    let missionPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          superhero.performAction(action);
          resolve("Mission accomplished successfully!");
        } else {
          reject("Mission failed due to unforeseen circumstances.");
        }
      }, 2000);
    });

    let result = await missionPromise;
    print(result);
  } catch (error) {
    print(error);
  }
}

 
const heroProxy = new Proxy(Superhero, {
  construct(target, args) {
    print(`Creating a new hero: ${args[0]}`);
    return new target(...args);
  },
  get(target, property) {
    print(`Accessing static property '${property}'`);
    return target[property];
  }
});

const hero = new heroProxy("Clark Kent", "Superman");
hero.performAction("flying");
print(hero.energyStatus);
hero.revealIdentity();

heroMission(hero, "saving the city").then(() => {
  print(hero.energyStatus);
});
