 

 
const app = (function() {
     
    const user = {
        name: 'Alice',
        age: 30,
        getInfo: function() {
            return `${this.name}, Age: ${this.age}`;
        },
         
        *generateID() {
            let id = 1;
            while (true) {
                yield `${this.name}-${id++}`;
            }
        }
    };
    
     
    const userProxy = new Proxy(user, {
        set(target, property, value) {
            if (property === 'age' && (typeof value !== 'number' || value <= 0)) {
                throw new Error('Invalid age');
            }
            target[property] = value;
            return true;
        }
    });

     
    const fetchData = async () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve('Data fetched successfully!'), 1000);
        });
        const result = await promise;
        print(result);
    };

     
    const { getInfo } = userProxy;

     
    const dataMap = new Map([
        ['username', userProxy.name],
        ['userInfo', getInfo()]
    ]);

    print([...dataMap.entries()]);

     
    const idGenerator = userProxy.generateID();
    print(idGenerator.next().value);  
    print(idGenerator.next().value);  
    
    return {
        fetchData,
        userProxy
    };
})();

 
app.fetchData();

 
try {
    app.userProxy.age = -5;
} catch (error) {
    console.error(error.message);  
}

 
app.userProxy.age = 31;
print(app.userProxy.getInfo());  
