 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            throw new ReferenceError(`Property ${prop} does not exist.`);
        }
    }
};

 
async function* asyncNumberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
}

 
async function main() {
     
    const target = { name: 'AdvancedJS', version: '1.0' };
    const proxiedObject = new Proxy(target, handler);
    
     
    print('Project:', proxiedObject.name);

     
    try {
        print(proxiedObject.description);
    } catch (error) {
        console.error(error.message);
    }

     
    const numGen = asyncNumberGenerator(5);
    for await (const num of numGen) {
        print('Generated number:', num);
    }
}

main();
