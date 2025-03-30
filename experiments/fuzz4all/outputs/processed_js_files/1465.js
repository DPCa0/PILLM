class ComplexTask {
  #privateData = "Secret";  

  constructor(name) {
    this.name = name;
    this.promiseData = this.fetchData();
  }

  async fetchData() {
    try {
      const data = await new Promise((resolve, reject) => {
        setTimeout(() => resolve("Fetched Data"), 1000);
      });
      return data;
    } catch (error) {
      throw new Error("Data fetch failed!");
    }
  }

  *generatorFunction() {
    yield "Step 1 completed";
    yield "Step 2 completed";
    return "Final Step completed";
  }

  async process() {
    print(`Processing ${this.name}...`);

     
    const gen = this.generatorFunction();
    let genResult = gen.next();
    while (!genResult.done) {
      print(genResult.value);
      genResult = gen.next();
    }
    print(genResult.value);

     
    const data = await this.promiseData;
    print(`Data Received: ${data}`);
  }

  static executeMultiple(tasks) {
     
    return Promise.all(tasks.map(task => task.process()));
  }
}

 
const [{name: firstName}, {name: secondName}] = [{name: "Task A"}, {name: "Task B"}];

 
const taskSet = new Set([firstName, secondName].map(name => new ComplexTask(name)));

ComplexTask.executeMultiple([...taskSet]).then(() => {
  print("All tasks processed");
}).catch(console.error);
