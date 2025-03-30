 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
    try {
        print('Fetching data...');
        await delay(1000);
        const data = { user: 'JohnDoe', age: 30, admin: true };
        print('Data fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    },
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new Error('Age must be a number');
        }
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

(async () => {
    const data = await fetchData();
    const proxyData = new Proxy(data, handler);

    print(proxyData.user);  
    proxyData.age = 31;  
    try {
        proxyData.age = 'thirty';  
    } catch (e) {
        console.error(e.message);
    }

    print('Final Data:', proxyData);
})();
