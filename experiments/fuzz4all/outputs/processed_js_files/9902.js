 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve('Data Loaded'), 1000));

 
const userHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} doesn't exist`;
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            target[prop] = value;
            return true;
        } else {
            print(`Invalid value type for ${prop}. Expected a string.`);
            return false;
        }
    }
};

// Create a Proxy object for a user
const user = new Proxy({ name: 'Alice', age: '25' }, userHandler);

// Async/Await with IIFE to use top-level await features
(async () => {
    print('Fetching data...');
    
    // Using Promise.all with async/await to fetch data
    const results = await Promise.all([fetchData(), fetchData()]);
    print(results);

    // Working with user proxy
    print(user.name);        // 'Alice'
    print(user.nonExistent); // "Property nonExistent doesn't exist"
    
    user.age = 30;                  
    user.location = 'Wonderland';   
    print(user.location);     
    
     
    const uniqueKey = Symbol('unique');
    const map = new Map();
    map.set(uniqueKey, { info: 'Sensitive Data' });
    
    print(map.get(uniqueKey));  
})();
