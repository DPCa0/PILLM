 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve([
            { id: 1, name: 'Alice', roles: ['admin', 'user'] },
            { id: 2, name: 'Bob', roles: ['user'] },
            { id: 3, name: 'Charlie', roles: ['admin'] }
        ]);
    }, 1000);
});

const processUserRoles = async () => {
    const users = await fetchData();

     
    const roleMap = new Map();

    users.forEach(({ id, name, roles }) => {
        roles.forEach(role => {
            if (!roleMap.has(role)) {
                roleMap.set(role, new Set());
            }
            roleMap.get(role).add({ id, name });
        });
    });

     
    const output = [...roleMap.entries()].map(([role, members]) => {
        return {
            role,
            members: [...members].map(({ id, name }) => ({ id, name }))
        };
    });

     
    print(output);
};

 
processUserRoles();
