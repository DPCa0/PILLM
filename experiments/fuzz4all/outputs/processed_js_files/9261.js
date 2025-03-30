 
class SecretAgent {
  #codeName;
  static #missions = [];

  constructor(codeName) {
    this.#codeName = codeName;
  }

  static #authorizeAccess(agent) {
    return SecretAgent.#missions.includes(agent.#codeName);
  }

  static addMission(codeName) {
    SecretAgent.#missions.push(codeName);
  }

  attemptAccess() {
    return SecretAgent.#authorizeAccess(this) 
      ? `${this.#codeName} has access to the mission.` 
      : `${this.#codeName} is not authorized for this mission.`;
  }

   
  static async computeAccessCode(value) {
    const baseCode = BigInt(2 ** 53 - 1);
    const accessCode = value?.code ?? baseCode;
    const result = await Promise.resolve(accessCode * baseCode);
    print(`Access Code computed: ${result}`);
  }
}

 
const agentHandler = {
  get(target, prop) {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Intercepted call to ${prop}`);
        return target[prop].apply(this, args);
      };
    }
    return target[prop];
  },
};

 
const agent47 = new Proxy(new SecretAgent('Agent47'), agentHandler);

SecretAgent.addMission('Agent47');

print(agent47.attemptAccess());  

SecretAgent.computeAccessCode({ code: 12345678901234567890n });  
