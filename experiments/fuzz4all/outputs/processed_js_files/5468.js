 
const complexObject = {
    users: [
        { id: 1, name: "Alice", hobbies: ["reading", "hiking"] },
        { id: 2, name: "Bob", hobbies: ["painting", "gaming"] },
        { id: 3, name: "Charlie", hobbies: ["swimming", "biking"] }
    ],
    settings: {
        theme: "dark",
        notifications: true,
    }
};

 
async function fetchData() {
    const dataPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Fetched Data");
        }, 1000);
    });

    const data = await dataPromise;
    return data;
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const [firstUser, ...otherUsers] = complexObject.users;
const { theme, ...otherSettings } = complexObject.settings;

 
const secondUserHobby = complexObject.users[1]?.hobbies[0] ?? "No hobby";

 
(function () {
    const idGen = idGenerator();
    print("New ID:", idGen.next().value);
})();

 
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => 
        `${result}${string}<strong>${values[i] || ''}</strong>`, '');
}

const hobbyMessage = highlight`Bob's first hobby is ${secondUserHobby}`;

// Use of map, filter, and reduce
const hobbyLengths = complexObject.users
    .map(user => user.hobbies)
    .flat()
    .filter(hobby => hobby.length > 5)
    .reduce((acc, hobby) => ({ ...acc, [hobby]: hobby.length }), {});

print("First User:", firstUser);
print("Other Users:", otherUsers);
print("Theme:", theme);
print("Other Settings:", otherSettings);
print("Second User's Hobby:", secondUserHobby);
print("Hobby Message:", hobbyMessage);
print("Hobby Lengths:", hobbyLengths);

// Async/await call
fetchData().then(data => console.log("Async Data:", data