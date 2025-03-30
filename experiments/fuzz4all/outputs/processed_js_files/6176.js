(async function() {
    const fetchUserData = async (id) => {
        const url = `https: 
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error fetching user: ${response.statusText}`);
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

    const processData = ({ name, email, address: { city } }) => {
        print(`User: ${name}`);
        print(`Email: ${email}`);
        print(`City: ${city}`);
    };

    const userIds = [1, 2, 3];
    const userPromises = userIds.map(id => fetchUserData(id));

    try {
        const users = await Promise.all(userPromises);
        users.forEach(user => user && processData(user));
    } catch (error) {
        console.error('Error processing users:', error);
    }

     
    const userHandler = {
        get: (target, property) => {
            if (property in target) {
                print(`Accessing ${property}: ${target[property]}`);
                return target[property];
            } else {
                console.warn(`Property ${property} does not exist on user`);
                return undefined;
            }
        }
    };

    const testUser = { name: 'John Doe', email: 'johndoe@example.com', city: 'Metropolis' };
    const proxiedUser = new Proxy(testUser, userHandler);

    print(proxiedUser.name);   
    print(proxiedUser.unknownProperty);   

     
    const cities = new Set(users.map(user => user.city));
    print('Unique Cities:', [...cities]);

     
    function* userProperties(user) {
        for (let key of Object.keys(user)) {
            yield [key, user[key]];
        }
    }

    const sampleUser = users[0];
    for (let [key, value] of userProperties(sampleUser)) {
        print(`User ${key}: ${value}`);
    }
})();
