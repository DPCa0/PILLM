 

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

let obj = new Proxy({ name: "Complex Object" }, handler);

 
function* generatorFunction() {
  yield "This";
  yield "is";
  yield "a";
  yield "complex";
  yield "JavaScript";
  yield "program";
}

 
const fetchData = async () => {
  return new Promise((resolve) => setTimeout(() => resolve("Fetched Data"), 1000));
};

 
(async function main() {
  print("Starting program...");

   
  obj.newProperty = "I'm a Proxy!";
  print(obj.newProperty);

   
  const gen = generatorFunction();
  let result = gen.next();
  while (!result.done) {
    print(result.value);
    result = gen.next();
  }

   
  const data = await fetchData();
  print(data);

  print("Program finished!");
})();
