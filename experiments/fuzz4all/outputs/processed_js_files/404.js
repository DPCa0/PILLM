class ComplexFeatureDemo {
  constructor() {
     
    this.#privateData = "Secret";

     
    this.map = new Map();
  }

   
  #privateData;

   
  async fetchData(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

   
  *idGenerator() {
    let id = 1;
    while (true) {
      yield id++;
    }
  }

   
  createObservable(obj) {
    return new Proxy(obj, {
      set(target, prop, value) {
        print(`Property ${prop} set to ${value}`);
        target[prop] = value;
        return true;
      }
    });
  }

   
  accessData(obj) {
    return obj?.nested?.value ?? "Default Value";
  }

   
  manageCache(key, value) {
    this.map.set(key, value);
    return this.map.get(key);
  }
}

 
(async () => {
  let demo = new ComplexFeatureDemo();

   
  let data = await demo.fetchData("https://jsonplaceholder.typicode.com/todos/1");
  print("Fetched Data: ", data);

   
  let generator = demo.idGenerator();
  print("Generated IDs: ", generator.next().value, generator.next().value);

   
  let person = demo.createObservable({});
  person.name = "Alice";

   
  let result = demo.accessData({ nested: { value: "Present" } });
  print("Accessed Data: ", result);

   
  demo.manageCache("user", { name: "Bob" });
  print("Cached User: ", demo.map.get("user"));
})();
