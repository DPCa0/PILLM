 
async function fetchData() {
    const data = await new Promise((resolve) => 
        setTimeout(() => resolve(['apple', 'banana', 'orange', 'pineapple']), 1000)
    );
    return data;
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting value of ${property}`);
            return target[property];
        }
        return `Property ${property} does not exist`;
    },
    set(target, property, value) {
        print(`Setting value of ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const reactiveData = new Proxy({}, handler);

 
function* fruitGenerator(data) {
    for (let item of data) {
        yield item;
    }
}

 
(async function main() {
    const fruits = await fetchData();
    
     
    fruits.forEach((fruit, index) => {
        reactiveData[`fruit${index}`] = fruit;
    });

     
    const gen = fruitGenerator(fruits);
    for (let fruit of gen) {
        print(fruit);
    }

     
    print(reactiveData.fruit1);  
    print(reactiveData.fruit10);  
})();
