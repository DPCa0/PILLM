 

 

 

 
const fetchData = () => new Promise((resolve) =>
    setTimeout(() => resolve([
        { id: 1, name: 'Alice', age: 28, active: true },
        { id: 2, name: 'Bob', age: 34, active: false },
        { id: 3, name: 'Charlie', age: 22, active: true }
    ]), 1000)
);

 
const filterActiveUsers = users => users.filter(({ active }) => active);

 
const transformUserData = users => 
    users.map(({ name, age }) => ({
        username: name.toUpperCase(),
        ageInFiveYears: age + 5
    }));

 
async function main() {
    try {
        print("Fetching user data...");
        const users = await fetchData();
        print("Raw data:", users);

        const activeUsers = filterActiveUsers(users);
        print("Active users:", activeUsers);

        const transformedData = transformUserData(activeUsers);
        print("Transformed data:", transformedData);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
main();
