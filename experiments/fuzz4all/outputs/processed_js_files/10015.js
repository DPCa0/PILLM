 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print(`Cache hit for args: ${key}`);
            return cache.get(key);
        }
        print(`Calculating result for args: ${key}`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
const fetchJson = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

 
const processUser = ({ name, email, ...rest }) => {
    print(`User Name: ${name}\nEmail: ${email}\nDetails:`, rest);
};

 
function* generateSequence(start = 0, end = 10) {
    for (let i = start; i < end; i++) {
        yield i;
    }
}

 
(async () => {
    try {
        const memoizedFetchJson = memoize(fetchJson);
        const user = await memoizedFetchJson('https://jsonplaceholder.typicode.com/users/1');
        
         
        processUser(user);

         
        const sequence = generateSequence(1, 5);
        for (let value of sequence) {
            print(`Generated value: ${value}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();
