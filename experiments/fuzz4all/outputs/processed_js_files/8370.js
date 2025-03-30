 

 
const secret = Symbol('secretValue');

 
const person = new Proxy(
  {
    name: 'Alice',
    age: 25,
    [secret]: 'hidden'
  },
  {
    get(target, prop) {
      if (prop === 'age') {
        print(`Accessing age, which is ${target[prop]}`);
        return target[prop] * 2;  
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (prop === 'age' && value < 0) {
        print('Age cannot be negative');
        return false;
      }
      target[prop] = value;
      return true;
    }
  }
);

 
const fetchData = async () => {
  const data = await new Promise((resolve) =>
    setTimeout(() => resolve({ info: 'Data fetched successfully' }), 1000)
  );
  print(data.info);
};

 
(async function main() {
  print(`Name: ${person.name}`);
  print(`Age (doubled): ${person.age}`);

   
  person.age = -5;
  print(`Attempting to set a negative age: ${person.age}`);

   
  print(`Secret: ${person[secret]}`);

   
  await fetchData();
})();
