 

 
function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
async function fetchMultipleData(urls) {
    let results = [];
    for (let url of urls) {
        const data = await fetchData(url);
        print(`Fetched: ${data}`);
        results.push(data);
    }
    return results;
}

 
function* incrementer(start) {
    let i = start;
    while (true) {
        yield i++;
    }
}

 
const validateHandler = {
    set: (obj, prop, value) => {
        if (typeof value === 'number' && value >= 0) {
            obj[prop] = value;
            return true;
        } else {
            print(`Invalid value for ${prop}: ${value}`);
            return false;
        }
    }
};

let user = { name: "Alice", age: 25 };
let validatedUser = new Proxy(user, validateHandler);
validatedUser.age = 30;  
validatedUser.age = -5;  

 
async function main() {
    print("Start Fetching Data...");
    
    const urls = ["http://api.site1.com", "http://api.site2.com", "http://api.site3.com"];
    const results = await fetchMultipleData(urls);
    
    print("Fetched All Data:", results);
    
    const gen = incrementer(1);
    print("Generator Test:");
    print(gen.next().value);  
    print(gen.next().value);  
    print(gen.next().value);  
}

main();
