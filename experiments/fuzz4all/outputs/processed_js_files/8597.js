 
const fetchData = async (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://api.example.com/data") {
                resolve([
                    { id: 1, name: "Alice", score: 95 },
                    { id: 2, name: "Bob", score: 83 },
                    { id: 3, name: "Charlie", score: 89 },
                ]);
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
};

(async () => {
    try {
        const url = "https://api.example.com/data";
        const data = await fetchData(url);

         
        const highScorers = data
            .filter(({ score }) => score > 85)
            .map(({ id, name, score }) => ({ id, name, isTopScorer: score > 90 }));

         
        highScorers.forEach(({ id, name, isTopScorer }) => {
            print(`ID: ${id}, Name: ${name}, Top Scorer: ${isTopScorer}`);
        });

         
        const averageScore = data.reduce((acc, { score }, _, { length }) => acc + score / length, 0);
        print(`Average Score: ${averageScore.toFixed(2)}`);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
})();
