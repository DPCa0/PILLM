 

 
function* dataGenerator() {
  const data = [
    { id: 1, name: 'Alice', score: 85 },
    { id: 2, name: 'Bob', score: 92 },
    { id: 3, name: 'Charlie', score: 78 }
  ];
  
  for (const item of data) {
    yield new Promise(resolve => 
      setTimeout(() => resolve(item), Math.random() * 1000)
    );
  }
}

 
async function processData() {
  const gen = dataGenerator();
  let scores = [];

  for (let promise of gen) {
    const { id, name, score } = await promise;
    print(`Processing: ID=${id}, Name=${name}, Score=${score}`);
    scores.push(score);
  }

  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  print(`Average Score: ${averageScore}`);
}

processData().catch(err => console.error(err));
