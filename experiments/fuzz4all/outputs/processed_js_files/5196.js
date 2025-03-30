 

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function processUserData(users) {
    return users.map(({ id, name, email, address: { city, zipcode } }) => ({
        id,
        name,
        email,
        city,
        zipcode
    }));
}

function createUserMap(users) {
    return users.reduce((map, user) => {
        map.set(user.id, user);
        return map;
    }, new Map());
}

async function main() {
    try {
        const users = await fetchData('https://jsonplaceholder.typicode.com/users');
        const processedUsers = processUserData(users);
        const userMap = createUserMap(processedUsers);

        for (const [id, { name, city }] of userMap) {
            print(`User ID: ${id}, Name: ${name}, City: ${city}`);
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

main();
