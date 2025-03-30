 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const logMethods = (obj) => new Proxy(obj, {
    get(target, propKey, receiver) {
        const origMethod = target[propKey];
        return function (...args) {
            print(`Called ${propKey} with arguments: ${JSON.stringify(args)}`);
            return origMethod.apply(this, args);
        };
    }
});

 
const fetchData = async () => {
    await delay(1000);
    return { id: 1, name: "Item 1", price: 100 };
};

 
class Store {
    #items = new Map();

    constructor() {
        this.#items = new Map();
    }

    async addItem() {
        const data = await fetchData();
        this.#items.set(data.id, data);
    }

    getItem(id) {
        return this.#items.get(id);
    }

    async purchaseItem(id) {
        await delay(500);
        if (this.#items.has(id)) {
            print(`Purchased item: ${JSON.stringify(this.#items.get(id))}`);
            this.#items.delete(id);
        } else {
            print("Item not found!");
        }
    }
}

 
const store = logMethods(new Store());

(async () => {
    await store.addItem();
    print("Available Item:", store.getItem(1));
    await store.purchaseItem(1);
    await store.purchaseItem(2);
})();
