 

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const processUserData = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const userData = await fetchData(url);
    
    return userData.map(user => ({
        fullName: `${user.name} (${user.username})`,
        email: user.email,
        address: `${user.address.street}, ${user.address.city}`
    }));
};

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property ${prop} doesn't exist`);
            return 'Unknown';
        }
    }
};

(async () => {
    let users = await processUserData();
    const proxyUsers = users.map(user => new Proxy(user, handler));
    
    for (let user of proxyUsers) {
        print(`Name: ${user.fullName}`);
        print(`Email: ${user.email}`);
        print(`Address: ${user.address}`);
        print(`Phone: ${user.phone}`); // will warn and return 'Unknown'
        print('-----');
    }
})();
