 

 
function safeHtml(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    let value = values[i - 1];
    if (typeof value === 'string') {
      value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return acc + value + str;
  });
}

 
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(...arguments);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
function* objectEntries(obj) {
  const keys = Reflect.ownKeys(obj);
  for (let key of keys) {
    yield [key, obj[key]];
  }
}

 
function main() {
   
  person.name = 'Bob';
  print(person.name);

   
  const username = "<script>alert('Hack');</script>";
  print(safeHtml`User's name is ${username}`);

   
  for (let [key, value] of objectEntries(person)) {
    print(`${key}: ${value}`);
  }
}

 
main();
