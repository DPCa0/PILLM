 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([
            { id: 1, name: 'Alice', skills: ['JavaScript', 'Python', 'C++'] },
            { id: 2, name: 'Bob', skills: ['Java', 'C#', 'JavaScript'] },
            { id: 3, name: 'Charlie', skills: ['Python', 'Ruby'] }
        ]);
    }, 1000);
});

(async function processData() {
    try {
        const data = await fetchData();
        
         
        const skillSet = new Set();
        const usersMap = new Map(data.map(user => {
            const { id, name, skills } = user;   
            skills.forEach(skill => skillSet.add(skill));
            return [id, { name, skills }];
        }));
        
         
        usersMap.forEach((user, id) => {
            print(`User ID: ${id}, Name: ${user.name}, Skills: ${user.skills.join(', ')}`);
        });

         
        print('\nUnique Skills:', ...skillSet);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
