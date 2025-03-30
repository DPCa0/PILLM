 

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 2000);
    });
}

 
function* dataGenerator(urls) {
    for (const url of urls) {
        yield fetchData(url);
    }
}

 
const urls = new Proxy(['https://api1.com', 'https://api2.com', 'https://api3.com'], {
    get(target, prop) {
        print(`Accessing URL[${prop}]: ${target[prop]}`);
        return target[prop];
    }
});

async function main() {
    const generator = dataGenerator(urls);
    let result = generator.next();
    
    while (!result.done) {
        try {
            const data = await result.value;
            print(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
        }
        result = generator.next();
    }
}

 
main();
