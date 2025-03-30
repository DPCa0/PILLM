 

const fetchUserData = async (id) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                userId: id,
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                roles: ['admin', 'editor', 'user'],
                details: {
                    age: 28,
                    location: 'New York',
                }
            };
            resolve(data);
        }, 1000);
    });
};

const processUserData = async (userId) => {
    try {
        const { name, email, roles, details: { location } } = await fetchUserData(userId);

         
        const roleList = roles.map(role => role.toUpperCase()).join(', ');

        print(`User: ${name}`);
        print(`Email: ${email}`);
        print(`Roles: ${roleList}`);
        print(`Location: ${location}`);

         
        const logRoleDetails = role => print(`Role: ${role}`);
        roles.forEach(logRoleDetails);

    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

 
processUserData(1);
