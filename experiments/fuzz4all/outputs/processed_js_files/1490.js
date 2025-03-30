 

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const processUserData = async () => {
    try {
        const usersData = await fetchData('https://jsonplaceholder.typicode.com/users');
        
         
        const processedData = usersData.map(({ id, name, email, address: { city } }) => ({
            id,
            name,
            contactInfo: { email, city }
        }));

         
        const posts = await Promise.all(usersData.map(user => fetchData(`https: 
        
         
        const mergedData = processedData.map((user, index) => ({
            ...user,
            posts: posts[index]
        }));

        print(mergedData);

    } catch (error) {
        console.error('Error processing user data:', error);
    }
};

processUserData();
