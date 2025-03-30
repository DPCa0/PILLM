 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const logger = new Proxy({}, {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
});

 
async function complexFeatureDemo() {
    logger.message = "Processing, please wait...";
    print(logger.message);

    await delay(1000);   

    const someComplexComputation = () => {
         
        const symbolKey = Symbol('uniqueKey');
        logger[symbolKey] = Math.random();
        
         
        function* computeSequence() {
            let start = 1;
            while (start <= 5) {
                yield start++;
            }
        }

        let sequence = computeSequence();
        for (let value of sequence) {
            print(`Computed Value: ${value * logger[symbolKey]}`);
        }
    };

    someComplexComputation();

    print("Demo completed.");
}

 
complexFeatureDemo();
