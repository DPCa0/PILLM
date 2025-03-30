 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: 'Sample Data' });
            } else {
                reject(new Error('404 Not Found'));
            }
        }, 1000);
    });
};

 
function* idGenerator(start = 1) {
    let id = start;
    while (true) {
        yield id++;
    }
}

 
const user = {
    firstName: 'John',
    lastName: 'Doe'
};

const handler = {
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new Error('Age must be a number');
        }
        target[property] = value;
        return true;
    }
};

const proxyUser = new Proxy(user, handler);

 
(async () => {
    try {
         
        const response = await fetchData('https://api.example.com/data');
        print('Data fetched:', response.data);
        
         
        proxyUser.age = 30;   
        print('User age set to:', proxyUser.age);
        
         
         
        
         
        const generator = idGenerator();
        print('Generated ID:', generator.next().value);   
        print('Generated ID:', generator.next().value);   
        
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
