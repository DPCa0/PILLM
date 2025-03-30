 
(async () => {
    const fetchData = async (url) => {
         
        return new Promise((resolve) => setTimeout(() => resolve({
            data: {
                users: [
                    { id: 1, name: 'Alice', age: 30 },
                    { id: 2, name: 'Bob', age: 25 },
                    { id: 3, name: 'Charlie', age: 35 }
                ]
            }
        }), 1000));
    };

    const processUsers = ({ data: { users } }) => {
        const userSummary = users.map(({ name, ...rest }) => {
            return { name, details: { ...rest } };
        });

         
        const sortUsers = () => {
            return userSummary.sort((a, b) => a.details.age - b.details.age);
        };

        return {
            userSummary,
            sortedUsers: sortUsers()
        };
    };

    try {
        const response = await fetchData('https://api.example.com/users');
        const { userSummary, sortedUsers } = processUsers(response);

        print('User Summary:', userSummary);
        print('Sorted Users by Age:', sortedUsers);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
