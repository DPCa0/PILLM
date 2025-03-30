 

 
class SecretAgent {
   
  #codeName;
  
  constructor(name) {
    this.#codeName = name;
  }
  
   
  revealIdentity() {
    return `Agent: ${this.#decryptName()}`;
  }

   
  #decryptName() {
    return this.#codeName.split('').reverse().join('');
  }
}

 
async function getAgentMission(agentName) {
  try {
    let agent = new SecretAgent(agentName);

    let missionPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve("Your mission, should you choose to accept it..."), 2000);
    });

     
    let missionMessage = await missionPromise;
    return `${agent.revealIdentity()} - ${missionMessage}`;
  } catch (error) {
    console.error("Error fetching mission:", error);
  }
}

 
const missionControlHandler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : `Mission detail for "${prop}" is classified.`;
  }
};

 
const missionControl = new Proxy({}, missionControlHandler);

 
missionControl.operation = "Operation Silent Thunder";

 
getAgentMission("enimairT").then(console.log);
print(missionControl.operation);  
print(missionControl.unknownOperation);  
