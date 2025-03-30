 
async function* fetchUserData(userId) {
    const response = await fetch(`https: 
    yield await response.json();
}

async function main() {
    const userIdArray = [1, 2, 3, 4, 5];
    
    const userPromises = userIdArray.map(userId => (async () => {
        for await (let userData of fetchUserData(userId)) {
            return userData;
        }
    })());

    const users = await Promise.all(userPromises);

    const userNames = users.map(user => user.name);
    print('User Names:', userNames);
    
     
    const uniqueFirstLetters = [...new Set(userNames.map(name => name[0]))];
    print('Unique First Letters:', uniqueFirstLetters);
    
     
    for (const { name, email } of users) {
        print(`Name: ${name}, Email: ${email}`);
    }
}

main().catch(console.error);
