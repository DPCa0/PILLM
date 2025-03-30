 

const fetchData = async () => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, title: 'Advanced JavaScript', views: 1000, tags: ['JS', 'ES6', 'Programming'] });
        }, 1000);
    });
};

const processTags = ({ tags, ...rest }) => {
     
    const enhancedTags = tags.map(tag => `#${tag}`);
    return { ...rest, enhancedTags };  
};

const handler = {
    get: (target, property) => {
        return property in target ? target[property] : 'Property does not exist';
    }
};

(async () => {
    try {
        const data = await fetchData();
        const processedData = processTags(data);
        
        const proxyData = new Proxy(processedData, handler);

         
        const { id, title, enhancedTags } = proxyData;
        
        print(`ID: ${id}\nTitle: ${title}\nTags: ${enhancedTags.join(', ')}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
