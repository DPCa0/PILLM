 

const fetchData = async () => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'John Doe', age: 28 },
                { id: 2, name: 'Jane Smith', age: 34 },
                { id: 3, name: 'Sam Green', age: 22 }
            ]);
        }, 1000);
    });
};

const processUserData = async () => {
    try {
        const data = await fetchData();

         
        const userSummaries = data.map(({ id, name, age }) => ({
            userId: id,
            summary: `${name} is ${age} years old`
        }));

        return userSummaries;
    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

 
(async () => {
    const userSummaries = await processUserData();

    if (userSummaries) {
        userSummaries.forEach(({ userId, summary }) => {
            print(`User ID: ${userId}, Summary: ${summary}`);
        });
    }
})();
