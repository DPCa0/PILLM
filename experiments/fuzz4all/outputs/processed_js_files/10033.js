 

 
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, title: 'Advanced JavaScript', tags: ['async', 'await', 'promise', 'es6'] });
        }, 1000);
    });
};

 
const getTagNames = ({ tags = [] }) => tags;

 
const logTags = (title, ...tags) => {
    print(`Title: ${title}`);
    print('Tags:');
    tags.forEach((tag, index) => print(`${index + 1}. ${tag}`));
};

 
(async () => {
    try {
        const { title, ...data } = await fetchData();  
        const tags = getTagNames(data);
        logTags(title, ...tags);  
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
