(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const processData = data => {
        const processed = new Set(data.map(item => item.name.toUpperCase()));
        return [...processed].sort();
    };

    const logData = data => {
        print('Processed Data:', data);
    };

    const url = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(url);
    if (data) {
        const processed = processData(data);
        logData(processed);
    }

     
    const createValidatedObject = () => {
        const handler = {
            set: (obj, prop, value) => {
                if (prop === 'age' && typeof value !== 'number') {
                    throw new TypeError('Age must be a number');
                }
                obj[prop] = value;
                return true;
            }
        };
        return new Proxy({}, handler);
    };

    const validatedObject = createValidatedObject();
    validatedObject.name = 'Alice';
    validatedObject.age = 30;  
    print('Validated Object:', validatedObject);

     
    const uniqueKey = Symbol('unique');
    const obj = {
        [uniqueKey]: 'This is a unique key'
    };
    print('Unique Symbol Key:', obj[uniqueKey]);

    await delay(1000);
    print('Hello, world!');
})();
