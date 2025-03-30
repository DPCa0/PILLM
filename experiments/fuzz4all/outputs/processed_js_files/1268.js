 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: {
                    name: "John Doe",
                    age: 28
                },
                posts: [
                    { id: 1, title: "Post 1", content: "Content 1" },
                    { id: 2, title: "Post 2", content: "Content 2" }
                ]
            });
        }, 1000);
    });
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        } else {
            return `Default value for '${prop}'`;
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
async function main() {
    try {
        const { user, posts } = await fetchData();
        const proxyUser = new Proxy(user, handler);
        
        print(`User's name: ${proxyUser.name}`);
        print(`User's age: ${proxyUser.age}`);
        print(`Nonexistent property: ${proxyUser.nonexistent}`);

        const [firstPost, secondPost] = posts;
        print(`First post title: ${firstPost.title}`);
        print(`Second post title: ${secondPost.title}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
