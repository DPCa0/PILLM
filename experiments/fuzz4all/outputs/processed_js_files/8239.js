(async function advancedJavaScriptFeatures() {
   
  const target = { message: "Hello, world!" };
  const handler = {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return Reflect.get(obj, prop);
    },
    set: (obj, prop, value) => {
      print(`Changed property ${prop} from ${obj[prop]} to ${value}`);
      return Reflect.set(obj, prop, value);
    }
  };
  const proxy = new Proxy(target, handler);

   
  print(proxy.message);
  proxy.message = "Hello, JavaScript!";

   
  const fetchData = async (url) => {
    print(`Fetching data from ${url}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: `Data from ${url}` });
      }, 1000);
    });
  };

   
  try {
    const data = await fetchData("https://example.com");
    print(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }

   
  function* generatorFunction() {
    yield "Step 1: Initialized.";
    yield "Step 2: Processing...";
    yield "Step 3: Completed!";
  }

  const iterator = generatorFunction();
  for (const step of iterator) {
    print(step);
  }

   
  const map = new Map();
  map.set("key1", "value1").set("key2", "value2");
  print("Map entries:");
  map.forEach((value, key) => print(key, value));

  const set = new Set(["apple", "banana", "apple"]);
  print("Set contains 'apple':", set.has("apple"));

   
  const user = { name: "Alice", age: 30 };
  const { name, age } = user;
  print(`User: ${name}, Age: ${age}`);

  const numbers = [1, 2, 3];
  const moreNumbers = [...numbers, 4, 5];
  print("Combined numbers:", moreNumbers);

   