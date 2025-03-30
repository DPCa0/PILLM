 
async function* fetchUserData(ids) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    for (const id of ids) {
        await delay(500);  
        yield fetch(`https: 
            .then(response => response.json());
    }
}

async function processUserData() {
    const ids = [1, 2, 3, 4, 5];
    const userDataGenerator = fetchUserData(ids);

    for await (const userPromise of userDataGenerator) {
        const user = await userPromise;
        const { id, name, email, address: { city } } = user;

        print(`User ID: ${id}`);
        print(`Name: ${name}`);
        print(`Email: ${email}`);
        print(`City: ${city}`);
        print('-------------------');
    }
}

processUserData().catch(error => console.error('Error processing user data:', error));
