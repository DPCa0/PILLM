 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 30, skills: ['JavaScript', 'Python'] }), 1000);
  });
};

function* processSkills(skills) {
  for (const skill of skills) {
    yield `Skill: ${skill}`;
  }
}

const displayData = async () => {
  try {
    const { name, age, skills } = await fetchData();  
    print(`Name: ${name}, Age: ${age}`);
    
    const [primarySkill, ...otherSkills] = skills;  
    print(`Primary Skill: ${primarySkill}`);

    for (const skillMsg of processSkills(otherSkills)) {
      print(skillMsg);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

displayData();
