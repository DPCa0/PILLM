 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'John Doe', age: 30, skills: ['JavaScript', 'React', 'Node.js'] });
    }, 1000);
  });
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting ${String(prop)}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting ${String(prop)} to ${value}`);
      obj[prop] = value;
      return true;
    },
  });
};

 
const processData = ({ user, age, skills }) => {
  const [firstSkill, ...otherSkills] = skills;
  const updatedSkills = [...otherSkills, 'TypeScript'];

  return {
    user,
    age,
    skills: updatedSkills,
    message: `User ${user} has skills: ${updatedSkills.join(', ')}`
  };
};

 
(async () => {
  try {
     
    const data = await fetchData();

     
    const proxiedData = createLoggingProxy(data);

     
    const processed = processData(proxiedData);

     
    print(processed.message);
  } catch (error) {
    console.error('Error:', error);
  }
})();
