 
class SecretAgent {
   
  #codename;
  #skills = new Set();

   
  static #agentsList = new WeakSet();

  constructor(codename, skills) {
    this.#codename = codename;
    skills.forEach(skill => this.#skills.add(skill));
    SecretAgent.#agentsList.add(this);
  }

   
  #logSkills() {
    print(`Skills of ${this.#codename}: ${[...this.#skills].join(', ')}`);
  }

   
  async completeMission(task) {
    await this.#executeTask(task);
    this.#logSkills();
  }

   
  async #executeTask(task) {
    print(`${this.#codename} is executing task: ${task}`);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

   
  static getAgentInfo(agent) {
    if (SecretAgent.#agentsList.has(agent)) {
      return `${agent.#codename} is a verified agent.`;
    }
    return 'Agent not found.';
  }
}

 
const agentHandler = {
  get(target, prop, receiver) {
    const origMethod = target[prop];
    if (typeof origMethod === 'function') {
      return function(...args) {
        print(`Calling ${prop} with args: ${args.join(', ')}`);
        return origMethod.apply(this, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const bond = new Proxy(new SecretAgent('007', ['Marksmanship', 'Stealth']), agentHandler);

 
(async () => {
  await bond.completeMission('Neutralize the threat');
  print(SecretAgent.getAgentInfo(bond));
})();
