 
async function* fetchData() {
    const data = ["apple", "banana", "cherry"];
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield item;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (typeof target[prop] === "function") {
            return function (...args) {
                print(`Calling ${prop} with arguments:`, args);
                return target[prop](...args);
            };
        }
        return target[prop];
    }
};

 
class FruitBasket {
    constructor() {
        this.basket = [];
    }
    addFruit(fruit) {
        this.basket.push(fruit);
        print(`${fruit} added to basket.`);
    }
}

const basket = new Proxy(new FruitBasket(), handler);

 
(async function main() {
    print("Starting fruit fetch...");

    for await (const fruit of fetchData()) {
        basket.addFruit(fruit);
    }

    print("All fruits added!");
})();
