 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', role: 'Developer' },
                { id: 2, name: 'Bob', role: 'Designer' },
                { id: 3, name: 'Charlie', role: 'Manager' }
            ]);
        }, 1000);
    });
};

 
function* processUsers(users) {
    for (const user of users) {
         
        const { id, name, role } = user;
        yield `User ${id}: ${name}, Role: ${role}`;
    }
}

 
(async () => {
    print('Fetching user data...');
    const users = await fetchData();
    print('Processing user data...\n');

     
    const userProcessor = processUsers(users);

     
    for (const userInfo of userProcessor) {
        print(userInfo);
    }
})().catch(err => console.error(err));
