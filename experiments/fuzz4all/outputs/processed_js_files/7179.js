const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Could not fetch data: ${error}`);
    }
};

const processData = ({ name, age, skills }) => ({
    name,
    age,
    expertise: skills.filter(skill => skill.level === 'expert')
});

const createGreeting = ({ name, age, expertise }) => 
    `Hello, ${name}! You are ${age} years old and skilled in ${expertise.map(skill => skill.name).join(', ')}.`;

(async () => {
    const dataUrl = 'https://api.example.com/userdata';
    const userData = await fetchData(dataUrl);
    if (!userData) return;

    const processedData = userData.map(processData);
    processedData.forEach(user => print(createGreeting(user)));

    const expertUsers = processedData.filter(user => user.expertise.length > 0);
    print(`We have ${expertUsers.length} experts.`);
})();
