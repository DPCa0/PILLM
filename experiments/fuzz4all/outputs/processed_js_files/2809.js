 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function delayPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
const handler = {
    get(target, prop) {
        print(`Accessed property "${prop}"`);
        return target[prop];
    }
};

const proxiedGen = new Proxy(numberGenerator(), handler);

 
async function main() {
     
    const gen = proxiedGen;

    print("Starting generator and async function demo...");

    for (let i = 0; i < 5; i++) {
         
        print(`Generated number: ${gen.next().value}`);

         
        await delayPromise(1000);
    }

    print("Finished generator and async function demo.");
}

 
main().catch(console.error);
