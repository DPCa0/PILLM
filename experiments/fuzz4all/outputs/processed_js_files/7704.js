 
 

 
const fetchData = () => Promise.resolve({
    data: [
        { id: 1, name: 'Alice', score: 82 },
        { id: 2, name: 'Bob', score: 75 },
        { id: 3, name: 'Charlie', score: 98 }
    ]
});

 
(async function main() {
    try {
         
        const response = await fetchData();

         
        const { data } = response;

         
        const topScorers = data
            .filter(({ score }) => score >= 80)
            .map(({ name, score }) => `${name} scored ${score}`);

         
        print('Top Scorers:');
        print(topScorers.join('\n'));

    } catch (error) {
         
        console.error(`Error fetching data: ${error.message}`);
    }
})();
