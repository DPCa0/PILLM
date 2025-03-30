class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CustomError';
    }
}

const asyncFunction = async (num) => {
    if (num < 0) throw new CustomError('Negative number!');
    return num * 2;
};

const fetchData = () => 
    new Promise((resolve) => 
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000)
    );

const processData = async () => {
    try {
        const number = Math.floor(Math.random() * 10 - 5);  
        const result = await asyncFunction(number);
        
        const { data } = await fetchData();
        
        print(`Processed Number: ${result}, Fetched Data: ${data}`);
        
        const proxyData = new Proxy({ result, data }, {
            get(target, prop) {
                if (prop in target) {
                    print(`Accessing property "${prop}"`);
                    return target[prop];
                }
                throw new CustomError(`Property "${prop}" does not exist`);
            }
        });

        print(proxyData.result);
        print(proxyData.nonExistent);  

    } catch (error) {
        if (error instanceof CustomError) {
            console.error(`Custom Error: ${error.message}`);
        } else {
            console.error(`Error: ${error.message}`);
        }
    }
};

processData();
