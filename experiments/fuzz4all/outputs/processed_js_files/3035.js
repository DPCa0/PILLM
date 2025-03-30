 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve({ data: { user: 'John Doe', age: 30, hobbies: ['coding', 'music'] } });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
};

 
const dataHandler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessing property: ${property}`);
            return target[property];
        } else {
            console.error(`Property ${property} not found`);
        }
    }
};

 
(async function main() {
    try {
        const url = 'https://api.example.com/data';
        
         
        const { data } = await fetchData(url);
        const { user, age, hobbies } = data;
        
         
        const proxiedData = new Proxy({ user, age, hobbies }, dataHandler);

         
        print(`User: ${proxiedData.user}`);
        print(`Age: ${proxiedData.age}`);
        print(`Hobbies: ${proxiedData.hobbies.join(', ')}`);
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
