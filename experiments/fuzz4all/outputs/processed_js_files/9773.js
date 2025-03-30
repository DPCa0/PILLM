 

class API {
    constructor() {
        this.data = { message: "Initial Message" };
    }

    fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ message: "Fetched Async Message" });
            }, 1000);
        });
    }
}

const handler = {
    get: function (target, prop) {
        if (prop in target.data) {
            print(`Getting property '${prop}'`);
            return target.data[prop];
        } else {
            console.warn(`Property '${prop}' not found!`);
            return undefined;
        }
    },
    set: function (target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target.data[prop] = value;
        return true;
    }
};

(async () => {
    const api = new API();
    const proxyAPI = new Proxy(api, handler);

     
    print(proxyAPI.message);

     
    try {
        const newData = await proxyAPI.fetchData();
        proxyAPI.message = newData.message;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

     
    print(proxyAPI.message);
})();
