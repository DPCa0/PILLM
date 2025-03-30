 

 
async function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                users: [
                    { id: 1, name: 'Alice', age: 30 },
                    { id: 2, name: 'Bob', age: 25 },
                    { id: 3, name: 'Charlie', age: 35 }
                ],
                status: 'success'
            };
            if (data.status === 'success') {
                resolve(data);
            } else {
                reject('Error fetching data');
            }
        }, 1000);
    });
}

 
(async function () {
    try {
         
        const { users } = await fetchData('https://api.example.com/data');

         
        const userDescriptions = users.map(({ id, name, age }) => `User ID: ${id}, Name: ${name}, Age: ${age}`);

         
        const uniqueAges = [...new Set(users.map(user => user.age))];

         
        print('User Descriptions:', userDescriptions);
        print('Unique Ages:', uniqueAges);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
