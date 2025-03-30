 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const reactiveHandler = {
    get: (target, property) => {
        print(`Getting property '${property}'...`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'...`);
        target[property] = value;
        return true;
    }
};

let state = new Proxy({ count: 0 }, reactiveHandler);

 
const incrementState = async () => {
    for (let i = 0; i < 3; i++) {
        state.count += 1;
        print(`Count is now: ${state.count}`);
        await delay(1000);
    }
};

 
async function* numberGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        await delay(500);
        yield i;
    }
}

 
(async () => {
    print("Starting async operations...");

     
    incrementState();

     
    for await (const num of numberGenerator(1, 5)) {
        print(`Generated number: ${num}`);
    }
    
    print("All operations completed.");
})();
