 
const randomDelay = (min, max) => new Promise(resolve => {
    setTimeout(() => resolve(`Resolved after ${Math.random() * (max - min) + min} ms`), Math.random() * (max - min) + min);
});

 
const fetchAndProcessUserData = async () => {
    try {
         
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await userResponse.json();

         
        const userPromises = users.map(async user => {
             
            const delayMessage = await randomDelay(100, 1000);
            print(`Processing ${user.name} - ${delayMessage}`);
             
            const postsResponse = await fetch(`https: 
            const posts = await postsResponse.json();
            return { ...user, posts };
        });

         
        const processedUsers = await Promise.all(userPromises);

        print("All users processed:", processedUsers);

    } catch (error) {
        console.error("Error fetching or processing user data:", error);
    }
};

 
fetchAndProcessUserData();
