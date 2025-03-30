(async () => {
   
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

   
  const dataHandler = {
    get: (target, prop) => {
      print(`Accessing property ${prop}`);
      return target[prop];
    },
    set: (target, prop, value) => {
      print(`Setting property ${prop} to ${value}`);
      target[prop] = value;
      return true;
    }
  };

  const data = new Proxy({ user: 'Alice', age: 25 }, dataHandler);

   
  function* generateRandomNumbers(count) {
    while (count--) {
      yield Math.floor(Math.random() * 100);
    }
  }

   
  const randomNumbers = async () => {
    const promises = [...generateRandomNumbers(5)].map(num => delay(500).then(() => num));
    const results = await Promise.all(promises);
    return results;
  };

   
  const showData = ({ user, age }) => {
    print(`User: ${user}, Age: ${age}`);
  };

   
  data.user = 'Bob';
  showData(data);

  print('Fetching random numbers...');
  const numbers = await randomNumbers();
  print(`Generated numbers: ${numbers.join(', ')}`);
})();
