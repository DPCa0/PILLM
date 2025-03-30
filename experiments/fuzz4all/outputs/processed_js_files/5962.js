 

(async function() {
     
    const fetchData = (url) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({ data: [1, 2, 3, 4, 5] });
            } else {
                reject(new Error("404 Not Found"));
            }
        }, 1000);
    });

     
    const createMultiplier = (factor) => (number) => number * factor;

     
    const [multiplyByTwo, multiplyByThree] = [createMultiplier(2), createMultiplier(3)];

     
    const processData = async () => {
        try {
             
            const { data } = await fetchData("https://api.example.com/data");

             
            const doubled = data.map(multiplyByTwo);
            const tripled = data.map(multiplyByThree);

            print("Original Data:", data);
            print("Doubled Data:", doubled);
            print("Tripled Data:", tripled);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

     
    await processData();
})();
