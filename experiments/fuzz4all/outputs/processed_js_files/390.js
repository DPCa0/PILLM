 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexOperation() {
    print('Starting complex operation...');
    await delay(1000);
    
    const data = { value: 42 };
    const handler = {
        get: (target, property) => {
            if (property in target) {
                print(`Getting ${property}:`, target[property]);
                return target[property];
            }
            throw new Error(`Property ${property} does not exist`);
        },
        set: (target, property, value) => {
            print(`Setting ${property} to`, value);
            target[property] = value;
            return true;
        }
    };

    const proxyData = new Proxy(data, handler);
    print(`Initial value: ${proxyData.value}`);

    proxyData.value = 100;
    print(`Updated value: ${proxyData.value}`);

    try {
        print(proxyData.nonExistentProperty);
    } catch (e) {
        console.error(e.message);
    }

    print('Complex operation finished.');
}

complexOperation()
    .then(() => console.log('Operation completed successfully'))
    .catch(err => console.error('An error occurred:', err));
