 

const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve({
                    status: 200,
                    json: () => Promise.resolve({ items: [1, 2, 3, 4, 5] })
                });
            } else {
                reject(new Error("Invalid URL"));
            }
        }, 1000);
    });
};

const processData = async (url) => {
    try {
        const response = await fetchData(url);
        if (response.status === 200) {
            const { items } = await response.json();
            const results = items
                .map(x => x * 2)
                .filter(x => x > 5)
                .reduce((acc, val) => acc + val, 0);
            return results;
        }
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
};

const url = "https://api.example.com/data";

processData(url).then(result => {
    print("Processed result:", result);
});
