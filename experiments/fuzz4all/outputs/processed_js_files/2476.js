 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject('Invalid URL');
            }
        }, 1000);
    });
}

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Property '${property}' accessed with value: ${target[property]}`);
            return target[property];
        } else {
            console.error(`Property '${property}' not found`);
            return undefined;
        }
    }
};

const dataProxy = new Proxy({ name: 'John', age: 30 }, handler);

 
async function displayData() {
    try {
        const data = await fetchData('https://api.example.com');
        print(data);
    } catch (error) {
        console.error(error);
    }

     
    print(dataProxy.name);
    print(dataProxy.height);  
}

 
function* range(start, end) {
    while (start <= end) {
        yield start++;
    }
}

 
displayData();

const numbers = range(1, 5);
for (let num of numbers) {
    print(num);
}
