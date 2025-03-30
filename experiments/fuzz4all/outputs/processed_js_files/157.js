 

(async () => {
     
    const fetchData = (id) => new Promise((resolve) => {
        const data = { id, content: `Content for item ${id}` };
        const delay = Math.floor(Math.random() * 2000) + 500;
        setTimeout(() => resolve(data), delay);
    });

     
    const ids = [1, 2, 3, 4, 5];

     
    const processData = async () => {
        const fetchPromises = ids.map(id => fetchData(id));  
        const results = await Promise.all(fetchPromises);  

         
        results.forEach(({ id, content }) => {
            print(`Processed ${content}`);
        });
    };

     
    const closureExample = (function() {
        let count = 0;
        return function() {
            count++;
            print(`Closure count: ${count}`);
        };
    })();

     
    await processData();
    closureExample();
    closureExample();
    closureExample();
})();
