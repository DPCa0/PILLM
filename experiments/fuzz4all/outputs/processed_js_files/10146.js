 

 
class SecretAgent {
  #secretCode;
  static missionCount = 0;

  constructor(name) {
    this.name = name;
    this.#secretCode = this.#generateSecretCode();
  }

   
  #generateSecretCode() {
    return Math.random().toString(36).substring(2, 15);
  }

   
  getSecretCode() {
    return this.#secretCode;
  }

   
  static completeMission() {
    this.missionCount++;
    return `Mission completed! Total: ${this.missionCount}`;
  }
}

 
const performAsyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve('Operation Successful!') : reject('Operation Failed!');
    }, 1000);
  });
};

 
(async () => {
  const agent007 = new SecretAgent('James Bond');
  print(`Agent: ${agent007.name}, Secret Code: ${agent007.getSecretCode()}`);

  try {
    const result = await performAsyncOperation();
    print(result);
  } catch (error) {
    console.error(error);
  }

  print(SecretAgent.completeMission());
})();
