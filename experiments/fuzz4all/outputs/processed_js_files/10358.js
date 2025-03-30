 

 
async function* fetchDataGenerator(apiUrl) {
    let response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");
    let data = await response.json();
    yield data;
}

 
const logHandler = {
    get(target, prop) {
        print(`Accessed property ${prop}`);
        return prop in target ? target[prop] : "Property not found";
    }
};

 
async function displayData() {
    const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
    const dataProxy = new Proxy({}, logHandler);

    try {
        for await (let data of fetchDataGenerator(apiUrl)) {
             
            Object.assign(dataProxy, data);
            print("Title:", dataProxy.title);
            print("Body:", dataProxy.body);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

displayData();
