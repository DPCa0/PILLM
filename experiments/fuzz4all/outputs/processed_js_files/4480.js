class FetchService {
    constructor() {
        this.cache = new Map();
    }

    async fetchWithCache(url) {
        if (this.cache.has(url)) {
            print('Returning cached data');
            return Promise.resolve(this.cache.get(url));
        } 
        const response = await fetch(url);
        const data = await response.json();
        this.cache.set(url, data);
        return data;
    }
}

const fetchService = new FetchService();

async function main() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/1'  
    ];
    
    const dataPromises = urls.map(async (url) => {
        const data = await fetchService.fetchWithCache(url);
        return data;
    });

    const allData = await Promise.allSettled(dataPromises);
    
    allData.forEach(({ status, value }) => {
        if (status === 'fulfilled') {
            print('Data:', value);
        } else {
            console.error('Failed:', value);
        }
    });
}

main();

 
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 28
};

const personProxy = new Proxy(person, {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
});

print(personProxy.firstName);   
personProxy.age = 30;                
print(personProxy.age);         
