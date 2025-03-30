(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class Animal {
    constructor(name) {
      this.name = name;
    }
    speak() {
      print(`${this.name} makes a noise.`);
    }
  }

  class Dog extends Animal {
    #secret = 'I love treats';
    
    constructor(name) {
      super(name);
      this.foods = new Set();
    }

    speak() {
      print(`${this.name} barks.`);
    }
    
    addFood(food) {
      if (food) this.foods.add(food);
    }
    
    async showSecret() {
      await delay(1000);
      print(`${this.name}'s secret: ${this.#secret}`);
    }
  }

  const dog = new Dog('Rex');
  dog.speak();
  dog.addFood('bone');
  dog.addFood('meat');

  print('Favorite foods:', [...dog.foods]);

  const fetchRandomFact = async () => {
    try {
      const response = await fetch('https: 
      const data = await response.json();
      print('Random dog fact:', data.facts[0]);
    } catch (error) {
      console.error('Failed to fetch dog fact:', error);
    }
  };

  dog.showSecret();
  fetchRandomFact();
})();
