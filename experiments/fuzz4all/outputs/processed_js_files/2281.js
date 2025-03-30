 
const Logger = (() => {
    const logLevel = Symbol('logLevel');
    class Logger {
        constructor(level = 'INFO') {
            this[logLevel] = level;
        }
        
        log(message) {
            print(`[${this[logLevel]}] ${message}`);
        }
        
        setLevel(level) {
            this[logLevel] = level;
        }
    }
    return Logger;
})();

 
const createValidatedObject = (target, validationRules) => {
    return new Proxy(target, {
        set(obj, prop, value) {
            if (validationRules[prop] && !validationRules[prop](value)) {
                throw new Error(`Invalid value for ${prop}`);
            }
            obj[prop] = value;
            return true;
        }
    });
};

const validationRules = {
    age: value => typeof value === 'number' && value > 0,
    name: value => typeof value === 'string' && value.length > 0
};

const person = createValidatedObject({}, validationRules);

 
function* idGenerator(start = 1) {
    let id = start;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

 
(async () => {
    try {
         
        const logger = new Logger();
        logger.log('Program started');
        
         
        person.name = 'John Doe';
        person.age = 30;
        logger.log(`Person: ${JSON.stringify(person)}`);
        
         
        const id1 = idGen.next().value;
        const id2 = idGen.next().value;
        logger.log(`Generated IDs: ${id1}, ${id2}`);
        
         
        const data = await fetchData('https://api.example.com/data');
        logger.log(`Fetched data: ${JSON.stringify(data)}`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
