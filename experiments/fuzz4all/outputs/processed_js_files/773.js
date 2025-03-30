 
async function fetchDataAndProcess() {
     
    const fetchData = () => new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { userId: 1, name: 'John Doe', roles: ['admin', 'user'] };
            Math.random() > 0.1 ? resolve(data) : reject('Fetch error');
        }, 1000);
    });

    try {
        const userData = await fetchData();

         
        const { name, roles } = userData;

         
        print(`User Name: ${name}`);

         
        const [firstRole, ...otherRoles] = roles;
        print(`First Role: ${firstRole}`);
        
         
        const upperRoles = otherRoles.map(role => role.toUpperCase());
        print('Other Roles:', upperRoles);

         
        const uniqueRoles = new Set([...roles, 'guest']);
        print('Unique Roles:', uniqueRoles);

         
        function* roleGenerator() {
            for (let role of uniqueRoles) {
                yield role;
            }
        }

        const gen = roleGenerator();
        print('Generated Roles:', [...gen]);

    } catch (error) {
        console.error('Error:', error);
    }
}

 
(async () => {
    await fetchDataAndProcess();
})();
