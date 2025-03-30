 

 
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: "Some complex data" });
            } else {
                reject("Failed to fetch data");
            }
        }, 1000);
    });
};

 
function* dataGenerator(url) {
    try {
        const response = yield fetchData(url);
        print("Data received:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
}

 
async function asyncGeneratorRunner(generator, url) {
    const iterator = generator(url);
    const handleNext = async (result) => {
        if (result.done) return;
        try {
            const nextValue = await result.value;
            handleNext(iterator.next(nextValue));
        } catch (error) {
            iterator.throw(error);
        }
    };
    handleNext(iterator.next());
}

 
const urlValidatorProxy = new Proxy({}, {
    get: (target, property) => {
        const urlPattern = /^https?:\/\/[a-z]+\.[a-z]+\/\w+$/;
        if (urlPattern.test(property)) {
            return property;
        } else {
            throw new Error("Invalid URL format");
        }
    }
});

 
const safeUrl = urlValidatorProxy["https://api.example.com/data"];

(async () => {
    await asyncGeneratorRunner(dataGenerator, safeUrl);
})();
