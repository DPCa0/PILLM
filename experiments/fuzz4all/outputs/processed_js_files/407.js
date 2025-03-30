const data = {
    users: [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: 35 }
    ]
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
    await delay(1000);  
    return data;
};

const processUserData = async () => {
    try {
        const { users } = await fetchData();
        
         
        const usersWithId = users.map(({ name, age }, index) => ({
            id: Symbol(index),
            name,
            age,
            isAdult: age >= 18
        }));

         
        const averageAge = usersWithId.reduce((acc, { age }) => acc + age, 0) / usersWithId.length;

        print(`Average age of users: ${averageAge}`);

         
        function* adultUserNames() {
            for (const user of usersWithId) {
                if (user.isAdult) {
                    yield user.name;
                }
            }
        }

        print('Adult users:', [...adultUserNames()]);
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

processUserData();
