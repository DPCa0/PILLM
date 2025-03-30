 

const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Advanced JS',
        features: ['Promises', 'Async/Await', 'Destructuring', 'Template Literals'],
        level: 'Complex'
      });
    }, 1000);
  });
};

const processData = async (url) => {
  try {
    const { name, features, level } = await fetchData(url);
    const [feature1, ...otherFeatures] = features;

    print(`Course: ${name}`);
    print(`Level: ${level}`);
    print(`Key Feature: ${feature1}`);
    print(`Other Features: ${otherFeatures.join(', ')}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const url = 'https://api.example.com/course';
processData(url);
