 

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
    }
};

const processData = ({ name, age, ...rest }) => {
    print(`User's Name: ${name}, Age: ${age}`);
    print('Additional Data:', rest);
};

const user1 = {
    name: 'Alice',
    age: 30,
    city: 'Wonderland',
    occupation: 'Adventurer',
};

processData(user1);

(async () => {
    const url = 'https: 
    const { id, name, ...additionalInfo } = await fetchData(url) || {};
    if (name) {
        print(`User Fetched: ${name} (ID: ${id})`);
        print('Additional Info:', additionalInfo);
    }
})();
