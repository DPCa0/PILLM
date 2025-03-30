 
const complexOperation = async () => {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async () => {
    await sleep(1000);
    return { name: "John Doe", age: 30, skills: ["JavaScript", "React", "Node.js"] };
  };

  const personHandler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        print(`Property "${prop}" doesn't exist.`);
      }
    },
  };

  const personProxy = new Proxy(await fetchData(), personHandler);

  const uniqueSkills = new Set(personProxy.skills);

  const processSkills = ({ skills }) => skills.map(skill => skill.toUpperCase());

  const skillsSymbol = Symbol("skills");

  personProxy[skillsSymbol] = processSkills(personProxy);

  for (let skill of uniqueSkills) {
    print(`Skill: ${skill}`);
  }

  print(`Processed Skills: ${personProxy[skillsSymbol].join(", ")}`);
};

complexOperation();
