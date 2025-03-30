 

 
const fetchData = (ms) => {
    return new Promise(resolve => setTimeout(() => {
        resolve({
            name: "Advanced JavaScript",
            level: "Complex",
            features: ["async/await", "Promises", "Arrow Functions", "Spread Operator", "Destructuring"]
        });
    }, ms));
};

 
const getCourseInfo = async () => {
    try {
        const data = await fetchData(1000);
        
         
        const { name, level, features } = data;

        print(`Course: ${name}`);
        print(`Level: ${level}`);

         
        const allFeatures = [...features, "Template Literals", "Modules"];

        print("Features:");
        
         
        displayFeatures(...allFeatures);

    } catch (error) {
        console.error("Error fetching course info:", error);
    }
};

 
const displayFeatures = (...features) => {
    features.forEach((feature, index) => {
        print(`${index + 1}. ${feature}`);
    });
};

 
getCourseInfo();
