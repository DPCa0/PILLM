 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["apple", "banana", "cherry"]);
        }, 1000);
    });
};

 
function* processFruits(fruits) {
    for (const fruit of fruits) {
        yield `Processed ${fruit}`;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'next') {
            print('Calling next() on generator');
        }
        return Reflect.get(...arguments);
    }
};

 
(async () => {
    try {
        const fruits = await fetchData();
        const fruitProcessor = new Proxy(processFruits(fruits), handler);

        let result = fruitProcessor.next();
        while (!result.done) {
            print(result.value);
            result = fruitProcessor.next();
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
