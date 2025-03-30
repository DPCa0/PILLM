 

 
function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === "users") {
                resolve([
                    { id: 1, name: "Alice" },
                    { id: 2, name: "Bob" },
                ]);
            } else {
                reject("Endpoint not found");
            }
        }, 2000);
    });
}

 
async function getUserData() {
    try {
        const users = await fetchData("users");
        return users;
    } catch (error) {
        console.error(error);
    }
}

 
function* userGenerator(users) {
    for (let user of users) {
        yield `User ID: ${user.id}, Name: ${user.name}`;
    }
}

 
async function main() {
    const users = await getUserData();

    if (users) {
         
        const [firstUser, ...otherUsers] = users;

        print(`First User: ${firstUser.name}`);

         
        const newUser = { id: 3, name: "Charlie" };
        const updatedUsers = [...users, newUser];

        print("All Users:");
        updatedUsers.forEach((user) => print(user.name));

         
        const generator = userGenerator(updatedUsers);
        print("User Details:");
        for (let userDetail of generator) {
            print(userDetail);
        }

         
        print(`Total Users: ${updatedUsers.length}`);
    }
}

main();
