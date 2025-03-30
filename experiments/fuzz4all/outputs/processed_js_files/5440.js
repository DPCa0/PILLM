 
async function processData(data) {
  try {
     
    const { info: { name, age }, skills: [firstSkill] } = data;

     
    const format = (strings, ...values) => 
      strings.reduce((result, str, i) => result + str + (values[i] || ''), '');

    const message = format`Name: ${name}, Age: ${age}, First Skill: ${firstSkill}`;

     
    const [apiData, calculation] = await Promise.all([
      fetch('https://api.example.com/data').then(response => response.json()),
      new Promise(resolve => setTimeout(() => resolve(age * 2), 1000))
    ]);

     
    const allData = { ...apiData, age: calculation };
    const summarize = (...args) => args.join(', ');

    print(message);
    print(summarize(...Object.entries(allData)));
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
const sampleData = {
  info: { name: 'Alice', age: 30 },
  skills: ['JavaScript', 'React', 'Node.js']
};

 
processData(sampleData);
