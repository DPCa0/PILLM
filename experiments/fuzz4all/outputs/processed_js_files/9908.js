 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Sample Data from API" });
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

 
async function processData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        print(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
function* dataGenerator() {
    yield* ["First Piece", "Second Piece", "Third Piece"];
}

const gen = dataGenerator();

 
const handler = {
    get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return prop in target ? target[prop] : "Property not found";
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

const dataObject = new Proxy({}, handler);
dataObject.info = "Important Data";
print(dataObject.info);
print(dataObject.missingProperty);

 
const dataMap = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
]);

for (let [key, value] of dataMap) {
    print(`Map entry: ${key} => ${value}`);
}

 
const array = [1, 2, 3, 4, 5];
const filteredArray = array.filter(num => num % 2 === 0);
print([...filteredArray]);

processData();
print(gen.next().value);
print(gen.next().value);
