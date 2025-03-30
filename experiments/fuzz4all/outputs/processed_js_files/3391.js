 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

const processUsers = async (url) => {
    try {
        const data = await fetchData(url);

         
        const [{ id, name, ...rest }] = data;
        print(`First user: ID=${id}, Name=${name}`, rest);

         
        const modifiedUsers = data.map(user => ({ ...user, isActive: true }));

         
        const userPromises = modifiedUsers.map(async user => {
            const userData = await fetchData(`${url}/${user.id}`);
            return { ...user, details: userData };
        });

        const completeUserData = await Promise.all(userPromises);
        print(completeUserData);

    } catch (error) {
        console.error('Error processing users:', error);
    }
};

 
processUsers('https://jsonplaceholder.typicode.com/users');
