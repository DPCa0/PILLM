 
async function fetchUserData() {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await userResponse.json();

     
    const userDetails = users.map(({ id, name, email }) => ({
        id,
        name,
        email,
        welcomeMessage: `Hello, ${name}! Your email is ${email}.`
    }));

     
    const uniqueUserIds = new Set(userDetails.map(user => user.id));

     
    userDetails.forEach(user => {
        print(user.welcomeMessage ?? 'User data not available');
    });

     
    function* userGenerator() {
        for (let user of userDetails) {
            yield user;
        }
    }

     
    const userGenInstance = userGenerator();

     
    for (let userDetail of userGenInstance) {
        print(`Generated User: ${JSON.stringify(userDetail)}`);
    }
}

 
fetchUserData();
