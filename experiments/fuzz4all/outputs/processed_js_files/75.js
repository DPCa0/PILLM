 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = { name: "Advanced JS", topics: ["Promises", "async/await", "Destructuring", "Spread/Rest"] };
            Math.random() > 0.2 ? resolve(data) : reject(new Error('Fetch failed'));
        }, 1000);
    });
};

 
const handleData = async () => {
    try {
        const url = 'https://api.example.com/data';
        const { name, topics } = await fetchData(url);  
        
         
        const newTopics = [...topics, "ES6+ Features"];
        
        print(`Course: ${name}`);
        print('Topics Covered:');
        newTopics.forEach((topic, index) => {
            print(`${index + 1}. ${topic}`);
        });
        
    } catch (error) {
        console.error('Error:', error.message);
    }
};

 
handleData();
