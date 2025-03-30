 

 
async function* asyncGenerator(max) {
    for (let i = 1; i <= max; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i * 2;  
    }
}

 
const trapHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} not found, generating new value...`);
            return `New Value for ${prop}`;
        }
    }
};

const obj = new Proxy({}, trapHandler);

 
async function processValues() {
    const generator = asyncGenerator(5);  

    for await (const val of generator) {  
        print(`Generated: ${val}`);
    }

    print('Accessing properties with Proxy:');
    print(`Existing property: ${obj.existingProp = 'I exist!'}`);  
    print(`Non-existing property: ${obj.nonExistingProp}`);  
}

processValues();
