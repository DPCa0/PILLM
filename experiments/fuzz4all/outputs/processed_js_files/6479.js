 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

 
const asyncOperation = (input) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (input > 0) {
                resolve(`Success with input: ${input}`);
            } else {
                reject(new CustomError('Input must be greater than zero'));
            }
        }, 1000);
    });
};

 
(async () => {
     
    const target = { foo: 'bar' };
    const handler = {
        get: (target, prop, receiver) => {
            print(`Property accessed: ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
    };
    const proxy = new Proxy(target, handler);

    try {
         
        print(proxy.foo);

         
        const result = await asyncOperation(1);
        print(result);

         
        const { finalValue } = { finalValue: await asyncOperation(2) };
        print(`Destructured Value: ${finalValue}`);

    } catch (error) {
        if (error instanceof CustomError) {
            console.error(`Caught a CustomError: ${error.message}`);
        } else {
            console.error(`An error occurred: ${error}`);
        }
    } finally {
        print('Execution completed');
    }
})();
