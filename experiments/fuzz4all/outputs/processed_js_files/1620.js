 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
const processData = ({
    name,
    age = 0,
    details: { address = 'Unknown', occupation = 'Unemployed' } = {}
}) => {
    print(`Name: ${name}, Age: ${age}, Address: ${address}, Occupation: ${occupation}`);
};

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(url);
    const userGenerator = dataGenerator(users);

    for (const user of userGenerator) {
         
        const userInfo = {
            name: user?.name ?? 'No Name',
            age: user?.age ?? null,
            details: {
                address: user?.address?.city ?? 'Unknown City',
                occupation: user?.company?.catchPhrase ?? 'No Occupation'
            }
        };
        processData(userInfo);
    }
})();
