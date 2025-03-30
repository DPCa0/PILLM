 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age' && (value < 0 || value > 120)) {
      throw new Error('Age must be between 0 and 120');
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

 
(async () => {
  const idGen = idGenerator();
  person.name = "John Doe";
  
  try {
    person.age = 25;  
    print(`ID: ${idGen.next().value}, Name: ${person.name}, Age: ${person.age}`);
    
    await delay(1000);  

    person.age = -5;  
    print(`ID: ${idGen.next().value}, Name: ${person.name}, Age: ${person.age}`);
  } catch (error) {
    console.error("Error:", error.message);
  }

  try {
    person.age = 130;  
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
