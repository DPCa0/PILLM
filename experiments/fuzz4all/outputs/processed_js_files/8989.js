const fetchUserData = async (userId) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User${userId}`,
                    email: `user${userId}@example.com`
                });
            } else {
                reject('Invalid user ID');
            }
        }, 1000);
    });
};

const processData = (data) => {
     
    const { id, name, email } = data;
    print(`Processing data for user: ${name} (ID: ${id}, Email: ${email})`);
    
     
    return { ...data, processed: true };
};

const main = async () => {
    try {
        const userIds = [1, 2, 3, -1];
        
         
        const results = await Promise.all(
            userIds.map(async (id) => {
                try {
                    const data = await fetchUserData(id);
                    return processData(data);
                } catch (error) {
                    console.error(`Error processing user ${id}: ${error}`);
                    return null;
                }
            })
        );

         
        const successfulResults = results.filter(result => result !== null);
        print('Successfully processed users:', successfulResults);
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

main();
