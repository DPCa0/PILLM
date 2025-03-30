 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
  try {
    print("Starting complex operation...");

     
    const user = {
      id: 1,
      name: "John Doe",
      address: {
        street: "123 Main St",
        city: "Anytown"
      }
    };
    const { name, address: { city } } = user;
    print(`User: ${name}, City: ${city}`);

     
    const uniqueNumbers = new Set([1, 2, 2, 3, 4, 5, 5]);
    print("Unique Numbers Set:", [...uniqueNumbers]);

     
    const handler = {
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    };
    const userProxy = new Proxy(user, handler);
    userProxy.name = "Jane Doe";

     
    function* numberGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    const gen = numberGenerator();
    for (const num of gen) {
      print("Generated number:", num);
    }

     
    print("Waiting for 2 seconds...");
    await delay(2000);

    print("Operation completed!");

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
