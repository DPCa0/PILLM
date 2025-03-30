 

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: "Hello, advanced JavaScript!" });
        }, 1000);
    });
};

const logger = {
    log: (message) => console.log(`Logged: ${message}`),
};

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return () => console.warn(`${prop} is not a function on logger`);
        }
    },
};

const proxiedLogger = new Proxy(logger, handler);

const uniqueSym = Symbol("unique");

 
(async function main() {
    try {
        const response = await fetchData();
        print(response.data);

         
        proxiedLogger.log("This is a log message.");
        proxiedLogger.nonExistentMethod();

         
        const obj = { [uniqueSym]: "Unique Value" };
        print(obj[uniqueSym]);

    } catch (error) {
        console.error("Error:", error);
    }
})();
