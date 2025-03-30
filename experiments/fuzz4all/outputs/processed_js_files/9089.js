 

 
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ name: 'Alice', age: 30, country: 'Wonderland' });
        }, 1000);
    });
}

 
async function processUserData() {
    const { name, ...rest } = await fetchData();
    return { name: `User: ${name}`, ...rest };
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop === 'country') {
            return 'Classified';
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    const userData = await processUserData();
    const proxiedUser = new Proxy(userData, handler);
    
     
    function highlight(strings, ...values) {
        return strings.map((str, i) => `${str}<em>${values[i] || ''}</em>`).join('');
    }
    
    const message = highlight`Hello, ${proxiedUser.name}! You are from ${proxiedUser.country}.`;

    print(message);
})();
