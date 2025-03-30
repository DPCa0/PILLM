 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async () => {
  await delay(1000);
  return { id: 1, name: 'Advanced JavaScript', topics: ['Promises', 'Async/Await', 'Generators'] };
};

 
async function* dataStream() {
  const data = await fetchData();
  for (const topic of data.topics) {
    await delay(500);
    yield topic;
  }
}

 
const showData = ({ name, ...rest }) => {
  print(`Course Name: ${name}`);
  print('Additional Info:', { ...rest });
};

 
const main = async () => {
  try {
    const data = await fetchData();
    showData(data);
    
    print('Topics Stream:');
    for await (const topic of dataStream()) {
      print(`- ${topic}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
main();
