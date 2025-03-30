 
async function* fetchDataInChunks() {
  const dataChunks = ["Hello", "Async", "Generators", "In", "JavaScript"];
  for (const chunk of dataChunks) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield chunk;
  }
}

 
const user = {
  firstName: "Jane",
  lastName: "Doe",
  age: 28
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    print(`Accessing ${prop}`);
    return prop in target ? target[prop] : `No such property: ${prop}`;
  },
  set(target, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[prop] = value;
    print(`Setting ${prop} to ${value}`);
    return true;
  }
});

 
function highlight(strings, ...values) {
  return strings.reduce((acc, str, idx) => 
    `${acc}${str}<strong>${values[idx] || ""}</strong>`, "");
}

(async function main() {
  print(highlight`User: ${userProxy.firstName} ${userProxy.lastName}`);

   
  print(userProxy.age);
  userProxy.age = 29;
  print(userProxy.age);
  try {
    userProxy.age = "30";  
  } catch (err) {
    console.error(err.message);
  }

   
  print("Fetching data in chunks:");
  for await (const chunk of fetchDataInChunks()) {
    print(chunk);
  }
})();
