 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return response.json();
}

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const dataHandler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`Property "${property}" not found.`);
            return null;
        }
    }
};

async function main() {
    try {
        const url = 'https://api.github.com/users/github';
        const userData = await fetchData(url);
        
        const userProxy = new Proxy(userData, dataHandler);
        
        print(`User: ${userProxy.login}`);
        print(`Company: ${userProxy.company}`);
        print(`Location: ${userProxy.location}`);
        print(`Non-existent property: ${userProxy.nonExistent}`);
        
        print('Range of numbers from 1 to 5:');
        for (const num of range(1, 5)) {
            print(num);
        }
    } catch (error) {
        console.error(error.message);
    }
}

main();
