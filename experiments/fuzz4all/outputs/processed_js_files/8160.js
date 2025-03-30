 

const fetchData = async () => {
    const fakeApiData = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 30 },
                { id: 2, name: 'Bob', age: 25 },
                { id: 3, name: 'Charlie', age: 35 }
            ]);
        }, 1000);
    });

    const data = await fakeApiData();
    return data;
};

const processData = async () => {
    try {
        const data = await fetchData();
        
        const processUser = ({ id, name, age }) => {
            return `User ID: ${id}, Name: ${name}, Age: ${age}`;
        };

        data.forEach(user => {
            print(processUser(user));
        });

         
        const makeGreeting = (greeting) => {
            return function(name) {
                return `${greeting}, ${name}!`;
            };
        };

        const sayHello = makeGreeting('Hello');
        print(sayHello('World'));

         
        const handler = {
            get: (obj, prop) => {
                if (prop in obj) {
                    return obj[prop];
                } else {
                    return 'Property not found';
                }
            }
        };

        const userProxy = new Proxy(data[0], handler);
        print(userProxy.name);   
        print(userProxy.nonExistentProp);   

    } catch (error) {
        console.error('Error processing data:', error);
    }
};

processData();
