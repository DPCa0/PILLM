 

class ComplexFeatureExample {
  constructor(name) {
    this.name = name;
  }
  
  async delayedGreeting() {
    const message = await this.getGreeting();
    print(message);
  }
  
  getGreeting() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Hello, ${this.name}! This is an advanced JavaScript feature demo.`);
      }, 1000);  
    });
  }
  
  static start() {
    const example = new ComplexFeatureExample('world');
    example.delayedGreeting();
  }
}

ComplexFeatureExample.start();
