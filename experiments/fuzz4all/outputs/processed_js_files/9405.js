 

async function fetchUserData(userId) {
     
    const userPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: "John Doe",
                address: { street: "123 Elm St", city: "Somewhere" },
                hobbies: ["coding", "reading", "gaming"],
            });
        }, 1000);
    });

    const user = await userPromise;

     
    const { name, address: { city, ...restAddress }, hobbies } = user;

    print(`User: ${name}`);
    print(`City: ${city}`);
    print(`Other Address Info: `, restAddress);

     
    const newHobbies = [...hobbies, "biking"];
    print(`Updated Hobbies: `, newHobbies);
}

(async () => {
    await fetchUserData(1);
})();
