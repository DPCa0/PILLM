 

const fetchData = url => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { message: "Hello, Advanced World!", status: 200 };
        Math.random() > 0.5 ? resolve(data) : reject(new Error("Fetch failed"));
    }, 1000);
});

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            throw new Error(`Property "${prop}" does not exist.`);
        }
    }
};

async function main() {
    try {
        let data = await fetchData('https://example.com/data');
        let proxy = new Proxy(data, handler);

        print(proxy.message);  
        print(proxy.status);

         
        print(proxy.details?.info ?? "No details available");
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        print('Operation completed');
    }
}

main();
