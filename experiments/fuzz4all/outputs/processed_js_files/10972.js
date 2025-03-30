 

async function fetchData(url) {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                status: 200,
                data: {
                    users: [
                        { id: 1, name: "Alice" },
                        { id: 2, name: "Bob" },
                        { id: 3, name: "Charlie" }
                    ],
                    meta: { total: 3 }
                }
            });
        }, 1000);
    });
}

async function processData(url) {
    try {
        const response = await fetchData(url);

        if (response.status !== 200) {
            throw new Error('Failed to fetch data');
        }

         
        const { data: { users, meta: { total } } } = response;

         
        const newUsers = [...users, { id: 4, name: 'David' }];

         
        newUsers.forEach(({ id, name }) => {
            print(`User ID: ${id}, Name: ${name}`);
        });

        print(`Total users: ${total + 1}`);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

 
processData('https://example.com/api/users');
