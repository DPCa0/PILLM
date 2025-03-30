 
(async () => {
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  const createCounter = (initialValue = 0) => {
    let count = initialValue;
    return {
      increment: () => ++count,
      decrement: () => --count,
      getCount: () => count
    };
  };

  const counter = createCounter();

   
  const fruits = ['apple', 'banana', 'cherry'];
  const [firstFruit, ...restFruits] = fruits;

  print(`First fruit: ${firstFruit}`);
  print(`Other fruits: ${restFruits.join(', ')}`);

   
  try {
    const [response1, response2] = await Promise.all([
      axios.get('https://api.agify.io?name=michael'),
      axios.get('https://api.genderize.io?name=michael')
    ]);
    
    print(`Age prediction for Michael: ${response1.data.age}`);
    print(`Gender prediction for Michael: ${response2.data.gender}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const highlight = (strings, ...values) => strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');

  print(highlight`Current count is: ${counter.getCount()}`);
  counter.increment();
  print(highlight`Current count is: ${counter.getCount()}`);

   
  class Animal {
    constructor(type, name) {
      this.type = type;
      this._name = name;
    }

    get name() {
      return this._name;
    }

    set name(newName) {
      this._name = newName;
    }

    describe() {
      return `${this._name} is a ${this.type}`;
    }
  }

  const myPet = new Animal('dog', 'Buddy');
  print(myPet.describe());
  myPet.name = 'Max';
  print(myPet.describe());

})();
