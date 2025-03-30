 

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ userId: 1, username: 'john_doe', details: { age: 30, email: 'john@example.com' } });
        }, 1000);
    });
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    }
};

 
(async () => {
    try {
        const data = await fetchData();
        const proxiedData = new Proxy(data, handler);

         
        print('User ID:', proxiedData.userId);
        print('Username:', proxiedData.username);

         
        const proxiedDetails = new Proxy(proxiedData.details, handler);
        print('User Age:', proxiedDetails.age);
        print('User Email:', proxiedDetails.email);

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
