 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ id: 1, name: 'Item', value: 100 });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
}

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
    try {
        const data = await fetchData('https://api.example.com/data');
        const proxiedData = new Proxy(data, handler);

        print('Fetched data:', proxiedData);

        proxiedData.value += 50;  
        print('Updated value:', proxiedData.value);  

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
