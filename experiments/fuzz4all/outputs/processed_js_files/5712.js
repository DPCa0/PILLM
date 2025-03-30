 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: 'Secret Data' });
        }, 1000);
    });
};

 
async function processData() {
     
    let result = await fetchData();

     
    const handler = {
        get(target, prop) {
            if (prop in target) {
                print(`Accessing property "${prop}": ${target[prop]}`);
                return target[prop];
            }
            throw new Error(`Property "${prop}" does not exist on target.`);
        },
        set(target, prop, value) {
            print(`Setting property "${prop}" to "${value}"`);
            target[prop] = value;
            return true;
        }
    };

     
    const proxiedResult = new Proxy(result, handler);

     
    print(proxiedResult.data);  
    proxiedResult.data = 'Updated Secret Data';  
    print(proxiedResult.data);  
}

processData().catch(err => console.error(err));
