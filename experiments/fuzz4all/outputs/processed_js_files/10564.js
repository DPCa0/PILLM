 

 
const fetchData = async (url) => {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                id: 1,
                name: 'John Doe',
                skills: ['JavaScript', 'React', 'Node.js']
            };
            resolve(data);
        }, 1000);
    });
};

const processData = async () => {
    try {
        const url = 'https://api.example.com/user';
        
         
        const { name, skills } = await fetchData(url);
        
         
        const newSkills = [...skills, 'TypeScript', 'GraphQL'];
        
         
        const introduceUser = (userName, ...userSkills) => {
            print(`User ${userName} has the following skills:`);
            userSkills.forEach(skill => print(`- ${skill}`));
        };
        
         
        introduceUser(name, ...newSkills);

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

processData();
