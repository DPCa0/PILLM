 

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `User${id}` });
            } else {
                reject('Invalid user ID');
            }
        }, 1000);
    });
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const userProxyHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property "${property}": ${target[property]}`);
            return target[property];
        }
        return undefined;
    },
};

const main = async () => {
    try {
        const user = await getUser(1);
        const userProxy = new Proxy(user, userProxyHandler);
        
        print('Fetching data...');
        await delay(500);
        
        print(`Hello, ${userProxy.name}!`);
        print(`Your ID is: ${userProxy.id}`);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
