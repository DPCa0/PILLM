 
(async () => {
   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
   
  const modulePath = './mathUtils.js';  
  const { default: square } = await import(modulePath);

   
  const handler = {
    get(target, prop) {
      if (prop in target) {
        print(`Get property '${prop}' -> ${target[prop]}`);
        return target[prop];
      }
      throw new ReferenceError(`Property '${prop}' does not exist.`);
    },
    set(target, prop, value) {
      print(`Set property '${prop}' to ${value}`);
      target[prop] = value;
      return true;
    }
  };

  const user = new Proxy({ name: 'Alice', age: 30 }, handler);
  print(user.name);   

  user.age = 31;   

   
  const people = new Map();
  people.set(user.name, user.age);

   
  function* idMaker() {
    let index = 0;
    while (true) yield index++;
  }

  const gen = idMaker();

   
  const createPerson = () => ({
    id: gen.next().value,
    ...user
  });

  print(createPerson());

   
  const html = (strings, ...values) => 
    strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
  
  print(html`<p>${user.name} is ${user.age} years old.</p>`);

   
  print('Start processing...');
  await delay(1000);
  print('Completed process after a delay.');

   
  const numbers = [1, 2, 3, 4];
  print('Squared numbers:', numbers.map(square));
})();
