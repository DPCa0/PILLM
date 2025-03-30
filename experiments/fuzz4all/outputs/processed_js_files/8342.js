 
class SecretAgent {
  #alias;
  #codeName;
  static missionCount = 0;
  
  constructor(alias, codeName) {
    this.#alias = alias;
    this.#codeName = codeName;
  }
  
  #encryptMessage(message) {
    return [...message].map(char => String.fromCharCode(char.charCodeAt(0) + 3)).join('');
  }
  
  decryptMessage(encryptedMessage) {
    return [...encryptedMessage].map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
  }
  
  static trackMission() {
    SecretAgent.missionCount++;
    return `Mission count updated: ${SecretAgent.missionCount}`;
  }
  
  async performMission(message) {
    print(`Agent ${this.#alias} is on a mission...`);
    const encryptedMessage = this.#encryptMessage(message);
    print(`Encrypted message: ${encryptedMessage}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Decrypted message: ${this.decryptMessage(encryptedMessage)}`);
    print(SecretAgent.trackMission());
  }
}

 
const agents = [
  new SecretAgent('007', 'James Bond'),
  new SecretAgent('006', 'Alec Trevelyan')
];

const messages = ['Top Secret', 'For Your Eyes Only'];

Promise.all(agents.map((agent, index) => agent.performMission(messages[index])))
  .then(() => console.log('All missions completed!'))
  .catch(error => console.error('Error in mission:', error));
