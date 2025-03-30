 
class SecretAgent {
  #identity;
  #missionsCompleted = 0;

  constructor(identity) {
    this.#identity = identity;
  }

  revealIdentity() {
    print(`Agent identity is: ${this.#identity}`);
  }

  #incrementMission() {
    this.#missionsCompleted++;
  }

  completeMission() {
    this.#incrementMission();
    print(`Missions completed: ${this.#missionsCompleted}`);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
        return Reflect.apply(target[prop], target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const agent = new SecretAgent('007');
const proxiedAgent = new Proxy(agent, handler);

proxiedAgent.revealIdentity();
proxiedAgent.completeMission();
proxiedAgent.completeMission();

 
async function networkRequest() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data retrieved from network"), 1000);
  });
}

async function fetchData() {
  print("Fetching data...");
  const data = await networkRequest();
  print(data);
}

fetchData();

 
const uniqueKey = Symbol('uniqueKey');
const objectWithSymbol = {
  [uniqueKey]: 'This is a unique value'
};

print(objectWithSymbol[uniqueKey]);  
