 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                message: "Hello, world!",
                status: 200
            };
            resolve(data);
        }, 1000);
    });
};

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting property '${property}': ${target[property]}`);
            return target[property];
        } else {
            print(`Property '${property}' not found!`);
            return undefined;
        }
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

const dataHandler = async () => {
    try {
         
        const response = await fetchData('https://api.example.com/data');
        
         
        const proxyResponse = new Proxy(response, handler);

         
        print(proxyResponse.message);
        proxyResponse.newMessage = "Welcome to the Proxy world!";
        print(proxyResponse.newMessage);

         
        print(proxyResponse.nonExistent);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
dataHandler();
