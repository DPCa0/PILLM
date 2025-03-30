 

class RandomNumberAPI {
  static async fetchRandomNumber() {
    const response = await fetch('https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=1');
    const data = await response.json();
    return data[0];
  }
}

 
const loggingHandler = {
  get(target, property, receiver) {
    print(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (typeof value !== 'number') {
      throw new TypeError('The value must be a number');
    }
    print(`Setting property: ${property} to value: ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const obj = new Proxy({}, loggingHandler);

(async () => {
  try {
    const randomNumber = await RandomNumberAPI.fetchRandomNumber();
    print(`Fetched Random Number: ${randomNumber}`);
    obj.number = randomNumber;   
    print(`Current Number: ${obj.number}`);   
  } catch (error) {
    console.error('Error fetching random number:', error);
  }
})();
