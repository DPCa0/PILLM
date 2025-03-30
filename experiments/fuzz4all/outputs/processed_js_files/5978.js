 
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Alice', scores: [85, 92, 88] },
                { name: 'Bob', scores: [78, 81, 85] },
                { name: 'Charlie', scores: [91, 95, 94] }
            ]);
        }, 1000);
    });
}

 
const applyFunctionToScores = (data, func) => data.map(student => ({
    ...student,
    scores: student.scores.map(func)
}));

 
const calculateAverage = scores => scores.reduce((a, b) => a + b, 0) / scores.length;

 
(async () => {
    try {
        const rawData = await fetchData();
        const bonusScores = applyFunctionToScores(rawData, score => score + 5);
        const averageScores = bonusScores.map(student => ({
            name: student.name,
            average: calculateAverage(student.scores)
        }));

         
        const uniqueAverages = [...new Set(averageScores.map(student => student.average))];

        print('Unique Average Scores:', uniqueAverages);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
