 

const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve({data: {user: 'John Doe', age: 30}}) : reject('Failed to fetch data');
    }, 1000);
});

const processUserData = async () => {
    try {
        const { data: { user, age } } = await fetchData();
        print(`User Info: ${user}, Age: ${age}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const processMultiple = async () => {
    const tasks = Array(3).fill().map(() => processUserData());
    await Promise.all(tasks);
    print('All tasks processed');
};

 
processMultiple();
