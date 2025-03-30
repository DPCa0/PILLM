 

 
const fetchData = (endpoint) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (endpoint === '/data') {
            resolve({ user: 'John Doe', age: 25, hobbies: ['coding', 'hiking', 'gaming'] });
        } else {
            reject('Invalid endpoint');
        }
    }, 1000);
});

 
const userProxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        } else {
            console.error(`Property ${prop} does not exist`);
            return undefined;
        }
    }
};

async function main() {
    try {
        const endpoint = '/data';
        const response = await fetchData(endpoint);
        print(`Data fetched from ${endpoint}:`, response);
        
         
        const { user: name, age = 18, hobbies: [firstHobby, ...otherHobbies] } = response;

        print(`Name: ${name}, Age: ${age}`);
        print(`First Hobby: ${firstHobby}, Other Hobbies: ${otherHobbies.join(', ')}`);
        
         
        const proxiedData = new Proxy(response, userProxyHandler);
        
        print(proxiedData.user);     
        print(proxiedData.age);      
        print(proxiedData.email);    
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
main();
