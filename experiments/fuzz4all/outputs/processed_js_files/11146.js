 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
            resolve({ id: 1, name: 'John Doe', age: 30 });
        } else {
            reject('Data fetch error!');
        }
    }, 1000);
});

 
async function processData() {
    try {
        const data = await fetchData();
        print(`Data fetched: ${JSON.stringify(data)}`);
        const proxiedData = new Proxy(data, {
            get(target, prop) {
                print(`Accessing property: ${prop}`);
                if (prop in target) {
                    return target[prop];
                } else {
                    return `Property ${prop} does not exist`;
                }
            },
            set(target, prop, value) {
                if (typeof value === 'string' && value.trim() === '') {
                    console.warn('Cannot set empty string');
                    return false;
                }
                target[prop] = value;
                print(`Property ${prop} set to ${value}`);
                return true;
            }
        });

        print(`Name: ${proxiedData.name}`);
        proxiedData.age = 31;  
        print(`Updated Age: ${proxiedData.age}`);
        proxiedData.name = '';  
        print(`Name after invalid update: ${proxiedData.name}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
processData();
