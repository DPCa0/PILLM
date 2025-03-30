 
import fetch from 'node-fetch';

 
(async () => {
  try {
     
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();

     
    const { setup, punchline } = joke;

     
    print(`Here's a joke for you: \n${setup} - ${punchline}`);

    // Using Promise.all to perform multiple asynchronous operations concurrently
    const dataPromises = [
      fetch('https: 
      fetch('https://api.genderize.io?name=michael').then(res => res.json()),
      fetch('https://api.nationalize.io?name=michael').then(res => res.json()),
    ];

     
    const [ageData, genderData, nationalityData] = await Promise.all(dataPromises);

     
    print(`According to Agify, the age prediction for Michael is: ${ageData?.age ?? 'unknown'}`);
    print(`According to Genderize, the predicted gender for Michael is: ${genderData?.gender ?? 'unknown'}`);
    print(`According to Nationalize, the predicted nationality for Michael is: ${(nationalityData?.country[0]?.country_id) ?? 'unknown'}`);
  
  } catch (error) {
     
    console.error(`An error occurred: ${error.message}`);
  }
})();

 
function* fibonacciGenerator(limit) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < limit; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
print('Fibonacci sequence up to 10 terms:');
for (const num of fibonacciGenerator(10)) {
  print(num);
}
