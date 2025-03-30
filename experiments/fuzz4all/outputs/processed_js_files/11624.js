 

(async () => {
  const fetchData = () => 
    new Promise((resolve) => 
      setTimeout(() => resolve({ id: 1, name: 'Advanced JS', tags: ['JavaScript', 'ES6', 'Async'] }), 1000)
    );
  
  const processData = async () => {
    const { id, name, tags } = await fetchData();
    return `Course ID: ${id}
Course Name: ${name}
Tags: ${tags.join(', ')}`;
  };
  
  const logResult = async () => {
    try {
      const result = await processData();
      print(result);
    } catch (error) {
      console.error(`Error occurred: ${error}`);
    }
  };
  
  logResult();
})();
