 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', skills: ['JS', 'React'] },
                { id: 2, name: 'Bob', skills: ['Node', 'Express'] },
                { id: 3, name: 'Charlie', skills: ['Angular', 'TypeScript'] }
            ]);
        }, 1000);
    });
};

 
const processUsers = async () => {
    try {
        const data = await fetchData();
        
         
        const users = data.map(({ name, skills }) => ({ name, skills }));

         
        const skillSet = new Set();
        users.forEach(user => user.skills.forEach(skill => skillSet.add(skill)));
        
         
        const uniqueSkills = [...skillSet];

         
        const userMap = new Map();
        users.forEach(user => {
            userMap.set(user.name, user.skills);
        });

        print("Unique Skills:", uniqueSkills);
        print("User Map:", userMap);
    } catch (error) {
        console.error("Error processing users:", error);
    }
};

 
processUsers();
