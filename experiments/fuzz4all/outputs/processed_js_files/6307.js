 
(async () => {
     
    const fetchData = async () => {
        const mockData = { user: 'Alice', age: 30, active: true };
        return new Promise((resolve) => setTimeout(() => resolve(mockData), 1000));
    };

     
    const userHandler = {
        get: (target, prop) => {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
    };

     
    const userId = Symbol('id');

     
    const displayUserInfo = ({ user, age }) => {
        print(`User: ${user}, Age: ${age}`);
    };

     
    const logStatus = (userObj) => {
        print(`User active: ${userObj?.active}`);
    };

    try {
         
        const data = await fetchData();
        
         
        const proxiedUser = new Proxy(data, userHandler);
        proxiedUser[userId] = 12345;

         
        print(`User ID: ${proxiedUser[userId]}`);
        displayUserInfo(proxiedUser);
        logStatus(proxiedUser);
    } catch (error) {
        console.error('Error:', error);
    }
})();
