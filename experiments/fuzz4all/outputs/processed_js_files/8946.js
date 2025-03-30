 

 
function* numberSequence() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
const proxyHandler = {
    get: (target, prop) => {
        if (prop === 'next') {
            print(`Fetching next value...`);
            return target[prop].bind(target);
        }
        return target[prop];
    }
};

const sequence = new Proxy(numberSequence(), proxyHandler);

 
async function processNumbers() {
    for (let i = 0; i < 5; i++) {
        const { value } = sequence.next();
        await new Promise(resolve => setTimeout(resolve, 1000));  
        print(`Processed number: ${value}`);
    }
}

processNumbers();
