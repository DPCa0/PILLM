 

 
function fetchUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: userId, name: "John Doe", age: 28, interests: ["coding", "hiking", "music"] });
        }, 1000);
    });
}

 
function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { postId: 1, content: "Hello, world!" },
                { postId: 2, content: "JavaScript is awesome!" },
            ]);
        }, 1000);
    });
}

 
async function displayUserProfile(userId) {
    try {
         
        const [userData, userPosts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId),
        ]);

         
        const { name, age, interests } = userData;

         
        console.log(`User Profile:
        Name: ${name}
        Age: ${age}
        Interests: ${interests.join(', ')}`);

        print("\nUser Posts:");
        userPosts.forEach(({ postId, content }) => {
            print(`Post #${postId}: ${content}`);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
displayUserProfile(42);
