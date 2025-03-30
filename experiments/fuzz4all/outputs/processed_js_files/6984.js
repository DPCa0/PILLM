 
(async () => {
    const fetchData = async (url) => {
         
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    };

     
    const createLoggingProxy = (target) => {
        return new Proxy(target, {
            get: (obj, prop) => {
                print(`Accessing property: ${prop}`);
                return prop in obj ? obj[prop] : 'Property does not exist';
            },
            set: (obj, prop, value) => {
                print(`Setting property: ${prop} to ${value}`);
                obj[prop] = value;
                return true;
            }
        });
    };

     
    let data = { title: "Original Title", id: 1 };
    
     
    const proxyData = createLoggingProxy(data);

     
    print(proxyData.title);  
    proxyData.title = "Updated Title";  
    print(proxyData.nonExistentProperty);  

    try {
         
        const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
        print('Fetched Data:', apiData);
        
         
        const { title = "No Title", completed = false } = apiData;
        print(`Todo: ${title}, Completed: ${completed}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
