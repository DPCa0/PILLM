 

 
async function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: 'John Doe', age: 30 });
        }, 1000);
    });
}

 
const hiddenProperty = Symbol('hidden');

 
const handler = {
    get(target, property, receiver) {
        if (property === hiddenProperty) {
            return 'This is a hidden value!';
        }
        print(`Getting ${String(property)}...`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting ${String(property)} to ${value}...`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
(async function main() {
    try {
         
        const userData = await fetchUserData(1);
        
         
        const proxiedUserData = new Proxy(userData, handler);
        
         
        Reflect.defineProperty(proxiedUserData, hiddenProperty, {
            value: 'This is a hidden value!',
            writable: true,
            enumerable: false,
            configurable: true
        });
        
         
        print(proxiedUserData.name);
        print(proxiedUserData.age);

         
        proxiedUserData.name = 'Jane Smith';
        proxiedUserData.age = 25;

         
        print(proxiedUserData.name);
        print(proxiedUserData.age);

         
        print(proxiedUserData[hiddenProperty]);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
