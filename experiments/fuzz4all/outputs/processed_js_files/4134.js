 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

 
function* dataGenerator(dataArray) {
    for (let item of dataArray) {
        yield item;
    }
}

 
const loggerProxy = (target) => {
    return new Proxy(target, {
        get(obj, prop) {
            print(`Accessing property: ${prop}`);
            return prop in obj ? obj[prop] : "Property does not exist!";
        },
    });
};

 
(async () => {
    const dataUrl = "https://jsonplaceholder.typicode.com/posts";
    const fetchedData = await fetchData(dataUrl);

    if (fetchedData) {
         
        const loggedData = loggerProxy(fetchedData[0]);
        print(loggedData.userId);   

         
        const gen = dataGenerator(fetchedData);
        print(gen.next().value);   
    }
})();
