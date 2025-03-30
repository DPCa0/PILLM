 
 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: 'Alice', role: 'developer' });
        }, 1000);
    });
}

 
const handler = {
    set(target, property, value) {
        print(`Property ${property} changed from ${target[property]} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
    print("Fetching data...");
    const data = await fetchData();
    print("Data fetched:", data);
    
     
    const proxiedData = new Proxy(data, handler);
    
     
    proxiedData.user = 'Bob';
    proxiedData.role = 'designer';

     
    print("Final Data:", proxiedData);
}

 
main();
