 
class SecretManager {
  #secret;
  
  constructor(secret) {
    this.#secret = secret;
  }
  
   
  async *revealSecret() {
    const secretArray = [...this.#secret];
    for (const char of secretArray) {
      yield new Promise(resolve => setTimeout(() => resolve(char), 200));
    }
  }
  
   
  static async revealSecrets(managers) {
    const tasks = managers.map(manager => 
      manager.revealSecret().reduce(async (acc, charPromise) => {
        const char = await charPromise;
        return acc + char;
      }, "")
    );
    return Promise.all(tasks);
  }
}

 
const secrets = ["Code", "is", "poetry"];
const managers = secrets.map(secret => new SecretManager(secret));

 
(async () => {
  const revealedSecrets = await SecretManager.revealSecrets(managers);
  print(`The secrets are: ${revealedSecrets.join(' ')}`);
})();
