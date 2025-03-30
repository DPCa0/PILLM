 

 
(async () => {
     
    const fetchData = () => new Promise(resolve => 
        setTimeout(() => resolve([
            { name: 'Alice', score: 85 },
            { name: 'Bob', score: 92 },
            { name: 'Charlie', score: 79 },
            { name: 'David', score: 95 },
            { name: 'Eve', score: 70 }
        ]), 1000)
    );

    try {
         
        const data = await fetchData();

         
        const [first, second, ...rest] = data;
        print('Top performers:', first, second);

         
        const averageScore = data
            .map(({ score }) => score)
            .reduce((acc, score, _, { length }) => acc + score / length, 0);
        print('Average Score:', averageScore.toFixed(2));

         
        console.log(`Students above average: 
        ${data.filter(({ score }) => score > averageScore)
              .map(({ name }) => name)
              .join(', ')}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
