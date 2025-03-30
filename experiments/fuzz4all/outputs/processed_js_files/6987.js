 
 

 
const fetchData = () => new Promise(resolve => setTimeout(() => {
    resolve([
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 35 }
    ]);
}, 1000));

 
const processUserData = async () => {
    try {
        const data = await fetchData();

         
        const users = data.map(({ id, name, age }) => ({
             
            id,
            description: `User ${name} is ${age} years old.`
        }));

         
        const userMap = new Map(users.map(user => [user.id, user.description]));

         
        print(`Processed Users: ${[...userMap.values()].join('; ')}`);
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

 
processUserData();
