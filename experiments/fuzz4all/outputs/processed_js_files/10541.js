 

 
async function* fetchDataSimulator() {
    const data = ['apple', 'banana', 'cherry'];
    for (let item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield item;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Calling function ${prop}`);
                return target[prop].apply(this, args);
            };
        }
        print(`Accessing property ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
class FruitBasket {
    constructor() {
        this.basket = [];
    }
    async addFruit() {
        const proxy = new Proxy(this, handler);
        const fetchData = fetchDataSimulator();
        for await (const fruit of fetchData) {
            proxy.basket.push(fruit);
            print(`Added ${fruit} to the basket.`);
        }
    }
    getBasket() {
        return this.basket;
    }
}

 
(async function() {
    const basket = new FruitBasket();
    await basket.addFruit();
    print('Final Basket:', basket.getBasket());
})();
