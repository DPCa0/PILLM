(async function() {
  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const processData = ({ name, age, skills }) => {
    return {
      name: name.toUpperCase(),
      canDrive: age >= 18,
      skillset: skills.join(', ')
    };
  };

  const displayData = ({ name, canDrive, skillset }) => {
    print(`Name: ${name}`);
    print(`Can Drive: ${canDrive ? 'Yes' : 'No'}`);
    print(`Skills: ${skillset}`);
  };

  const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
  if (data) {
    const processed = processData({ name: data.name, age: data.age, skills: ['JavaScript', 'React', 'Node.js'] });
    displayData(processed);
  }
})();
