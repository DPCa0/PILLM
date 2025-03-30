 
'use strict';

 
const fetchData = async (url) => {
    try {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
         
        const data = await response.json();

         
        const { name: userName = 'Unknown', age = 'N/A', skills = [] } = data;
        
         
        print(`User: ${userName}, Age: ${age}, Skills: ${skills.join(', ')}`);

         
        const skillsCopy = [...skills];
        print('Cloned Skills:', skillsCopy);

         
        const uniqueSkills = new Set(skillsCopy);
        const skillMap = new Map();
        
        uniqueSkills.forEach((skill, index) => {
            skillMap.set(index, skill);
        });
        
         
        for (const [key, value] of skillMap.entries()) {
            print(`Skill ${key + 1}: ${value}`);
        }

         
        print(`Additional Info: ${data.additionalInfo?.summary ?? 'No additional info available'}`);

    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
fetchData('https://api.example.com/user');
