 

 
const uniqueKey = Symbol('unique');

 
class AdvancedCollection {
  #items = new Map();

   
  static #validateItem(item) {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Item must be a non-null object');
    }
  }

   
  addItem(id, item) {
    AdvancedCollection.#validateItem(item);
    this.#items.set(id, item);
  }

   
  *[Symbol.iterator]() {
    for (const item of this.#items.values()) {
      yield { ...item, [uniqueKey]: Symbol() };  
    }
  }

   
  static async *fetchData(ids) {
    for (const id of ids) {
      await new Promise(resolve => setTimeout(resolve, 100));  
      yield { id, data: `Data for ${id}` };  
    }
  }
}

 
async function processCollection(collection, ids) {
  for await (const data of AdvancedCollection.fetchData(ids)) {
    collection.addItem(data.id, data);
  }
}

 
const collectionHandler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop.toString()}"`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting property "${prop.toString()}" to`, value);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
(async () => {
  const collection = new Proxy(new AdvancedCollection(), collectionHandler);

  await processCollection(collection, [1, 2, 3]);

  for (const item of collection) {
    print('Iterated item:', item);
  }
})();
