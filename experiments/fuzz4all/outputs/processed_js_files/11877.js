 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', skills: ['JS', 'Python'] },
        { id: 2, name: 'Bob', skills: ['Java', 'C#'] },
        { id: 3, name: 'Charlie', skills: ['Go', 'Rust'] },
      ]);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const data = await fetchData();

     
    const dataMap = new Map(data.map(item => [item.id, item]));

     
    const [first, second, third] = data;
    const { name: firstName, skills: [firstSkill] } = first;
    const { name: secondName, skills: secondSkills } = second;
    const { name: thirdName } = third;

     
    const allSkills = new Set();
    data.forEach(item => item.skills.forEach(skill => allSkills.add(skill)));

    print('Data Map:', dataMap);
    print('First Person:', firstName, firstSkill);
    print('Second Person:', secondName, secondSkills);
    print('Third Person:', thirdName);
    print('All Unique Skills:', [...allSkills]);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();
