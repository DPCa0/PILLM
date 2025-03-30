 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({ data: [1, 2, 3, 4, 5] });
        } else {
            reject("Invalid URL");
        }
    }, 1000);
});

 
async function processData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        const { data } = response;
        
         
        const transformedData = data.map(num => num * 2);

         
        const sum = transformedData.reduce((acc, curr) => acc + curr, 0);

        print("Transformed Data:", transformedData);
        print("Sum:", sum);
    } catch (error) {
        console.error("Error:", error);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property "${property}" to "${value}"`);
        target[property] = value;
        return true;
    }
};

 
const obj = { a: 1, b: 2, c: 3 };
const proxyObj = new Proxy(obj, handler);

 
print(proxyObj.a);  
proxyObj.b = 4;           
print(proxyObj.b);  

 
processData();
