 
async function complexOperation() {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async () => {
    await delay(1000);  
    return { data: { value: Math.random(), nested: { prop: 'Sample' } } };
  };

  try {
    const { data: { value, nested: { prop } } } = await fetchData();
    
     
    if (value > 0.5) {
      const { upperCase } = await import('./textUtilities.js');  
      print(upperCase(`Value: ${value}, Prop: ${prop}`));
    } else {
      print(`Value: ${value}, Prop: ${prop}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

complexOperation();
