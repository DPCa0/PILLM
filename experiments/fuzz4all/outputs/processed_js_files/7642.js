 
async function complexOperation() {
     
    const fetchData = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve({ data: [1, 2, 3, 4, 5] }) : reject('Fetch error');
            }, 1000);
        });

     
    async function processData() {
        try {
            const result = await fetchData();
             
            const dataHandler = {
                get(target, prop) {
                    if (prop in target) {
                        print(`Accessing element ${prop}`);
                        return target[prop];
                    } else {
                        throw new Error(`Property ${prop} does not exist on target`);
                    }
                },
                set(target, prop, value) {
                    print(`Setting element ${prop} to ${value}`);
                    target[prop] = value * 2;  
                    return true;
                },
            };
            const proxiedData = new Proxy(result.data, dataHandler);

             
            print('Original data:', [...proxiedData]);
            proxiedData[1] = 10;  
            print('Modified data:', [...proxiedData]);
        } catch (error) {
            console.error('Error in processData:', error);
        }
    }

    processData();
}

complexOperation();
