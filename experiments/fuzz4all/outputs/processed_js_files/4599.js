 

 
const uniqueID = Symbol('id');

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ [uniqueID]: 1, name: 'John Doe', age: 30 });
    }, 1000);
});

 
async function getUserData() {
    try {
        const user = await fetchData();
        
         
        const userProxy = new Proxy(user, {
            get(target, property, receiver) {
                if (property in target) {
                    print(`Accessing property: ${String(property)}`);
                    return Reflect.get(target, property, receiver);
                } else {
                    console.warn(`Property ${String(property)} does not exist.`);
                }
            }
        });

         
        print(userProxy.name);  
        print(userProxy.nonExistentProperty);  

    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

getUserData();

 
const obj = {
    [uniqueID]: 'uniqueValue',
};

 
for (let key in obj) {
    print(`${key}: ${obj[key]}`);  
}

 
print(`Symbol property: ${obj[uniqueID]}`);
