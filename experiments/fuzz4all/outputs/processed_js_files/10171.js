 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { user: 'JohnDoe', age: 30, languages: ['JavaScript', 'Python', 'Rust'] };
        Math.random() > 0.1 ? resolve(data) : reject(new Error('Fetch error'));
    }, 1000);
});

 
const processUserData = async () => {
    try {
        const { user, languages } = await fetchData();  
        const uniqueLanguages = new Set(languages);  

         
        const languagesList = Array.from(uniqueLanguages, lang => lang.toUpperCase());

        print(`User: ${user}`);
        print(`Languages: ${languagesList.join(', ')}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

 
processUserData();
