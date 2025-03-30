 
class ComplexSystem {
  #secret;  

  constructor(name) {
    this.name = name;
    this.#secret = this.#generateSecret();
  }

   
  #generateSecret() {
    return Math.random().toString(36).substr(2, 5);
  }

  async processTask(input) {
    try {
      const result = await this.#asyncOperation(input);
      print(`Processed ${input}: ${result}`);
    } catch (error) {
      console.error('Error processing task:', error);
    }
  }

   
  static logSystemInfo() {
    print(`ComplexSystem at ${new Date().toISOString()}`);
  }

   
  *countTo(limit) {
    for (let i = 1; i <= limit; i++) {
      yield i;
    }
  }

   
  #asyncOperation(input) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (input < 0) reject('Negative input not allowed');
        resolve(this.#secret + input);
      }, 1000);
    });
  }
}

 
(async () => {
  const system = new ComplexSystem('Alpha');

   
  ComplexSystem.logSystemInfo();

   
  await system.processTask(42);

   
  const counter = system.countTo(3);
  for (let number of counter) {
    print(`Count: ${number}`);
  }
})();
