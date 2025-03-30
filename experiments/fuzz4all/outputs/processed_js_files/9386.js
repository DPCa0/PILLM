 

 
function* numberGenerator(n) {
    let num = 1;
    while (num <= n) {
        yield num++;
    }
}

 
const generatorHandler = {
    get: function(target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
async function processNumbers(n) {
    const numbers = new Proxy(numberGenerator(n), generatorHandler);

     
    for await (let number of numbers) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        print(`Processed number: ${number}`);
    }
}

 
(async () => {
    try {
        await processNumbers(5);
        print('All numbers processed successfully.');
    } catch (error) {
        console.error('Error processing numbers:', error);
    }
})();
