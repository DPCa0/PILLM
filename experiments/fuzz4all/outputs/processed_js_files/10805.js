 
const fetchData = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: { message: "Hello, World!" } });
        }, 1000);
    });
};

 
const dataProxyHandler = {
    get: (target, prop, receiver) => {
        print(`Property '${prop}' accessed on API response`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`Property '${prop}' set to '${value}' on API response`);
        return Reflect.set(target, prop, value);
    }
};

(async () => {
    try {
         
        const response = await fetchData();
        const proxyResponse = new Proxy(response.data, dataProxyHandler);

         
        const { message } = proxyResponse;
        print(message);

         
        proxyResponse.message = "Hi, Universe!";
        print(proxyResponse.message);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
