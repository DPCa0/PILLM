const data = [
  { name: 'Alice', age: 28, skills: ['JavaScript', 'React'] },
  { name: 'Bob', age: 32, skills: ['Python', 'Django'] },
  { name: 'Charlie', age: 25, skills: ['Java', 'Spring'] }
];

 
const formatUser = ({ name, age, skills }) => {
  const [firstSkill, ...restSkills] = skills;
  return `${name}, aged ${age}, is proficient in ${firstSkill} and ${restSkills.join(', ')}`;
};

 
const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data.map(formatUser)), 1000);
  });
};

 
(async () => {
  try {
    const userPromises = data.map(user => getUsers(user));
    const formattedUsers = await Promise.all(userPromises);
    formattedUsers.forEach(users => print(users));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();

 
const groupUsersByAge = users => {
  const ageGroups = new Map();
  users.forEach(user => {
    const ageGroup = Math.floor(user.age / 10) * 10;
    if (!ageGroups.has(ageGroup)) {
      ageGroups.set(ageGroup, []);
    }
    ageGroups.get(ageGroup).push(user);
  });
  return ageGroups;
};

 
const displayAgeGroups = ageGroups => {
  ageGroups.forEach((users, ageGroup) => {
    print(`Age ${ageGroup}s:`);
    users.forEach(user => print(` - ${user.name}`));
  });
};

const ageGroups = groupUsersByAge(data);
displayAgeGroups(ageGroups);
