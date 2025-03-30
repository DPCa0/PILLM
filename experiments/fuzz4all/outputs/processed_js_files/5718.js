 

 
const fetchUserData = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: "John Doe", email: "johndoe@example.com" });
        }, 1000);
    });
};

const fetchUserPosts = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: "First Post", content: "This is the first post" },
                { title: "Second Post", content: "This is the second post" }
            ]);
        }, 1000);
    });
};

 
const getUserProfile = async (userId) => {
    try {
        const [userData, userPosts] = await Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);

         
        const { name, email } = userData || {};
        const posts = userPosts?.map(({ title, content }) => ({ title, content })) || [];

        return { name, email, posts };
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

 
(async () => {
    const userProfile = await getUserProfile(1);
    print(userProfile);
})();
