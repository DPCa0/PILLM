 

 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ success: true, data: { value: 42, info: "The Answer" } });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
};

 
(async function() {
    try {
        const url = "https://api.example.com/data";
        const response = await fetchData(url);

         
        const { success, data: { value, info } } = response;

         
        const handler = {
            get: (target, prop, receiver) => {
                print(`Getting ${prop}`);
                return Reflect.get(target, prop, receiver);
            },
            set: (target, prop, value, receiver) => {
                print(`Setting ${prop} to ${value}`);
                return Reflect.set(target, prop, value, receiver);
            }
        };

        const proxiedData = new Proxy({ value, info }, handler);

         
        print(proxiedData.value);  
        proxiedData.value = 84;  
        print(proxiedData.value);  

         
        print(`Fetched data: ${proxiedData.value}, Info: ${proxiedData.info}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
