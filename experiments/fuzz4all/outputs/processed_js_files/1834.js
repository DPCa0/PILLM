 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error("404 Not Found"));
            }
        }, 1000);
    });
}

 
const arrayHandler = {
    get: (target, property) => {
        if (property === 'first') {
            return target[0];
        }
        if (property === 'last') {
            return target[target.length - 1];
        }
        return Reflect.get(target, property);
    },
    set: (target, property, value) => {
        print(`Setting index ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
async function main() {
    try {
        const response = await fetchData("https://api.example.com/data");
        const proxyArray = new Proxy(response.data, arrayHandler);

        print("First element:", proxyArray.first);
        print("Last element:", proxyArray.last);

         
        proxyArray[0] = 10;
        print("Modified array:", proxyArray);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
main();
