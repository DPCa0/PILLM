 

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
};

const processData = async () => {
    try {
        const posts = await fetchData();
        const [firstPost, ...rest] = posts;
        
         
        const { title, body } = firstPost;
        print(`Title: ${title}\nBody: ${body}`);
        
         
        const titles = rest.map(({ title }) => title);
        
        print('Other Titles:', titles.join(', '));
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
};

 
processData();
