 
const randomDelay = (maxDelay = 2000) => new Promise(resolve => setTimeout(resolve, Math.random() * maxDelay));

 
const fetchDataAndProcess = async () => {
    try {
        print("Fetching data...");
         
        await randomDelay();

         
        let response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        
        let data = await response.json();

         
        let processedData = data.map(({ id, title, body }) => ({ 
            id, 
            title: title.toUpperCase(), 
            body: body.slice(0, 50) 
        }));

         
        print("Processed Data:", processedData.slice(0, 5));  

    } catch (error) {
        console.error("An error occurred:", error);
    }
};

 
(async () => {
    print("Program Started");

     
    for await (const _ of Array(3)) {
        await fetchDataAndProcess();
        print("--------------------");
    }

    print("Program Ended");
})();
