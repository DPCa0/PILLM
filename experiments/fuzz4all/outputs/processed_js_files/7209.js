 

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === 'https://api.example.com/data') {
                resolve([
                    { id: 1, name: 'Alice', age: 25 },
                    { id: 2, name: 'Bob', age: 30 },
                    { id: 3, name: 'Charlie', age: 35 }
                ]);
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 1000);
    });
};

const processUsers = async (url) => {
    try {
        const users = await fetchData(url);
        const greetings = users.map(({ name, age }) => {
            const status = age >= 30 ? 'experienced' : 'youthful';
            return `Hello, ${name}! You're an ${status} individual.`;
        });
        return greetings;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
};

const url = 'https: 
processUsers(url).then((greetings) => {
    if (greetings) {
        greetings.forEach(greeting => print(greeting));
    }
});
