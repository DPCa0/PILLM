 
async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

function processData(data) {
    const uniqueValues = new Set(data);
    return [...uniqueValues].map(item => item.toUpperCase());
}

function proxyHandler(logs) {
    return {
        get(target, property) {
            logs.push(`Accessed property: ${property}`);
            return target[property];
        },
        set(target, property, value) {
            logs.push(`Updated property: ${property} to ${value}`);
            target[property] = value;
            return true;
        }
    };
}

async function main() {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/users');
        const processed = processData(data.map(user => user.username));

        const logs = [];
        const dataProxy = new Proxy(processed, proxyHandler(logs));

        dataProxy.forEach((value, index) => {
            print(`User ${index}: ${value}`);
            dataProxy[index] = value.toLowerCase();   
        });

        print('Log Entries:');
        logs.forEach(log => print(log));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
