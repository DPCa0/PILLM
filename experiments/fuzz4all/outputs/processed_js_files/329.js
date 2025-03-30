 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { name: "Advanced JS", features: ["Async/Await", "Promises", "Destructuring", "Spread", "Generators"] };
        resolve(data);
    }, 1000);
});

 
function* featureGenerator(features) {
    for (const feature of features) {
        yield feature;
    }
}

 
const processData = async (url) => {
    try {
        const { name, features } = await fetchData(url);  
        print(`Course: ${name}`);

        const allFeatures = [...features, "Modules", "Arrow Functions"];  
        print("All Features:", allFeatures);

        const featureGen = featureGenerator(allFeatures);
        for (const feature of featureGen) {
            print(`Feature: ${feature}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

 
processData("http://example.com/course");
