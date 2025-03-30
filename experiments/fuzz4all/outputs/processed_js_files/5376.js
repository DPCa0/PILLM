 
const randomTimeout = (message) => {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 3000);
        setTimeout(() => resolve(message), delay);
    });
};

 
const executeRandomTimeouts = async () => {
    try {
        const [result1, result2] = await Promise.all([
            randomTimeout("Result from the first timeout."),
            randomTimeout("Result from the second timeout."),
        ]);

        print(result1, result2);

         
        const targetObject = { hello: "world" };
        const handler = {
            get: (target, prop) => {
                print(`Property '${prop}' was accessed.`);
                return target[prop];
            }
        };

        const proxyObject = new Proxy(targetObject, handler);
        print(proxyObject.hello);

         
        function* numberGenerator(...nums) {
            for (const num of nums) {
                yield num * 2;
            }
        }

        const doubledNumbers = [...numberGenerator(1, 2, 3, 4, 5)];
        print(doubledNumbers);

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

 
executeRandomTimeouts();
