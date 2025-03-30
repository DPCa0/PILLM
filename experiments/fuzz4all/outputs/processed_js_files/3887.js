 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new CustomError('Failed to fetch data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error: ${error.name} - ${error.message}`);
        throw error;
    }
}

 
const userValidator = {
    set: (target, property, value) => {
        if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new CustomError("Age must be a positive number");
        }
        target[property] = value;
        return true;
    }
};

const user = new Proxy({}, userValidator);

 
function combineAndLog(prefix, ...values) {
    print(`${prefix}:`, ...values);
}

 
(async () => {
    const url = `https: 
    try {
        const result = await fetchData(url);
        combineAndLog(`Fetched Data`, result);

         
        user.name = "John Doe";
        user.age = -10;  
    } catch (error) {
        console.error(`Caught Error: ${error.message}`);
    }
})();
