 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: { user: "John Doe", age: 30 }, status: 200 });
            } else {
                reject(new Error("404: Not Found"));
            }
        }, 1000);
    });
};

const handler = {
    get: (target, property) => {
        return property in target ? target[property] : `Property '${property}' does not exist`;
    },
    set: (target, property, value) => {
        if (typeof value === 'number') {
            target[property] = value;
        } else {
            print(`Rejected: Property '${property}' must be a number`);
        }
        return true;
    }
};

const main = async () => {
    try {
        const response = await fetchData("https://api.example.com/data");
        const userProxy = new Proxy(response.data, handler);
        
        print(`User: ${userProxy.user}`);  
        print(`Age: ${userProxy.age}`);    

        userProxy.age = 31;  
        print(`Updated Age: ${userProxy.age}`);  

        userProxy.age = "thirty-one";  
        print(`Final Age: ${userProxy.age}`);  
    } catch (error) {
        console.error(error.message);
    }
};

main();
