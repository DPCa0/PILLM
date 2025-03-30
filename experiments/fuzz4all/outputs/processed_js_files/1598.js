 
const fetchUserData = async () => {
    try {
         
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Network response was not ok');

         
        const users = await response.json();

         
        const userSummary = users.map(({ id, name, email, address: { city } }) => ({
            id,
            name,
            email,
            city
        }));

         
        const uniqueCities = [...new Set(users.map(user => user.address.city))];

        print('User Summary:', userSummary);
        print('Unique Cities:', uniqueCities);
        
         
        const handler = {
            get: (target, property) => {
                print(`Accessing property: "${property}"`);
                return target[property];
            }
        };

        const proxiedUserSummary = new Proxy(userSummary, handler);

         
        print(proxiedUserSummary[0].name);
        print(proxiedUserSummary[1].email);

    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

 
(async () => {
    await fetchUserData();
})();
