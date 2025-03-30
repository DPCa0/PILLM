 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve({ name: "Alice", age: 30, job: "Developer" }), 1000));

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    } else {
      print(`Property '${prop}' not found`);
      return undefined;
    }
  }
};

 
(async function main() {
  print("Fetching data...");
  const { name, age, job } = await fetchData();   
  const user = new Proxy({ name, age, job }, handler);

   
  const greeting = `Hello, my name is ${user.name}. I'm a ${user.job} and I'm ${user.age} years old.`;
  print(greeting);

   
  print(`Non-existent property: ${user.location}`);
})();
