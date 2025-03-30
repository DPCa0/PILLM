 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

 
async function* colorGenerator() {
  while (true) {
    await delay(500);  
    yield randomColor();
  }
}

 
const applyRandomBackground = async () => {
  const colors = colorGenerator();
  for await (const color of colors) {
    print(`Applying color: ${color}`);
    document.body.style.backgroundColor = color;
  }
};

 
const person = { name: 'Alice', age: 30 };
const personProxy = new Proxy(person, {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  },
});

 
personProxy.name;  
personProxy.age = 31;  

 
const logDetails = ({ name, age, ...rest } = { name: 'Unknown', age: 0 }) => {
  print(`Name: ${name}, Age: ${age}`);
  print('Additional Details:', rest);
};

 
logDetails({ name: 'Bob', age: 25, occupation: 'Developer', hobby: 'Cycling' });

 
(async () => {
  await applyRandomBackground();
})();
