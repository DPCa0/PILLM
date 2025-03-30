 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve({
            users: [
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 32 },
                { id: 3, name: 'Charlie', age: 25 }
            ]
        });
    }, 1000);
});

 
function* userGenerator(data) {
    for (let user of data) {
        yield `${user.name} is ${user.age} years old.`;
    }
}

 
const processData = async () => {
    try {
        const { users } = await fetchData();
        const userGen = userGenerator(users);
        
        for (let message of userGen) {
            print(message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
processData();
