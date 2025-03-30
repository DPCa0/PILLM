 

 
function apiCallSimulation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(`Data received: ${data}`);
            } else {
                reject("No data received");
            }
        }, 1000);
    });
}

 
async function fetchData() {
    try {
        const result = await apiCallSimulation("Sample Data");
        print(result);
    } catch (error) {
        console.error(error);
    }
}

 
function* generateNumbers() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

 
const handler = {
    get: function(target, prop) {
        print(`Property '${prop}' accessed`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Property '${prop}' set to '${value}'`);
        target[prop] = value;
        return true;
    }
};

const dataObj = {
    name: "JavaScript",
    type: "Language"
};

const proxiedDataObj = new Proxy(dataObj, handler);

 
(async function main() {
    await fetchData();
    
    const numbers = generateNumbers();
    print(numbers.next().value);  
    print(numbers.next().value);  
    print(numbers.next().value);  
    
    proxiedDataObj.name = "TypeScript";
    print(proxiedDataObj.name);
})();
