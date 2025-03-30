 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { '/user': { name: 'Alice', age: 30 }, '/settings': { theme: 'dark' } };
            if (data[url]) {
                resolve(data[url]);
            } else {
                reject('Not Found');
            }
        }, 1000);
    });
}

 
async function loadUserData() {
    try {
        const user = await fetchData('/user');
        print('User data:', user);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

 
const mapLogger = new Proxy(new Map(), {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Map operation: ${prop}`, ...args);
                return target[prop].apply(target, args);
            };
        }
        return target[prop];
    },
    set(target, prop, value) {
        print(`Map set: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
});

 
async function main() {
    const user = await loadUserData();
    if (user) {
        mapLogger.set('userName', user.name);
        mapLogger.set('userAge', user.age);
        print('User name from map:', mapLogger.get('userName'));
    }
}

 
main();
