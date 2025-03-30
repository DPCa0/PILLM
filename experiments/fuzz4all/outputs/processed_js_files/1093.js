 
const addPadding = (text, padding = ' ', ...styles) => {
    return `%c${padding}${text}${padding}`.concat('%c', ...styles.map(s => `%c${s}`));
};

 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
(() => {
    const user = { name: 'Alice', age: 30 };
    const { name, age } = user;

     
    (async () => {
         
        const fetchUserData = memoize(async (username) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ username, details: `Fetched details for ${username}` });
                }, 1000);
            });
        });

        print('Fetching user data...');
        const userData = await fetchUserData(name);
        const styledMessage = addPadding(`Hello, ${userData.username}!`, '*', 'color: blue;', 'font-weight: bold;');
        print(styledMessage, 'color: green;', 'text-decoration: underline;');
    })();
})();
