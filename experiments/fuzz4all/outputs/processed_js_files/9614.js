 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.1 ? resolve({ id: 1, name: 'Alice', scores: [90, 85, 88] }) : reject('Failed to fetch');
    }, 1000);
});

 
const calculateAverage = scores => scores.reduce((acc, score) => acc + score, 0) / scores.length;

 
const processData = async () => {
    try {
        const { id, name, scores } = await fetchData();
        const average = calculateAverage(scores);

         
        print(`User ${name} (ID: ${id}) has an average score of ${average}.`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
(async () => await processData())();
