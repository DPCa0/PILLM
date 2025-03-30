 
const fetchUserData = async (userId) => {
    try {
        const response = await fetch(`https: 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
    }
};

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const userHandler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            return `Property '${property}' does not exist`;
        }
    }
};

 
(async () => {
    print('Fetching user data...');
    const user = await fetchUserData(1);

    if (user) {
        const userProxy = new Proxy(user, userHandler);
        print(`User Name: ${userProxy.name}`);
        print(`Non-existent Property: ${userProxy.nonExistent}`);

        print('Simulating delay...');
        await delay(2000);  
        print('Delay finished.');

         
        const userEmails = new Set();
        const userMap = new Map();
        
        userMap.set(user.id, user);
        userEmails.add(user.email);
        
        print('User Email Set:', userEmails);
        print('User Map:', userMap);
        
         
        const { name, email, ...rest } = user;
        const updatedUser = { ...rest, name: name.toUpperCase(), email };
        
        print('Updated User:', updatedUser);
    }
})();
