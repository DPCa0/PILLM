class Employee {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }

  getDetails() {
    return `${this.name} works as a ${this.position}.`;
  }
}

const dataStore = new Proxy(new Map(), {
  get(target, prop) {
    print(`Accessing property '${prop}'`);
    return target.get(prop);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}'`);
    target.set(prop, value);
    return true;
  },
});

const employee1 = new Employee('Alice', 'Developer');
const employee2 = new Employee('Bob', 'Designer');

dataStore.set('emp1', employee1);
dataStore.set('emp2', employee2);

function* employeeGenerator(store) {
  for (let entry of store) {
    yield entry[1];
  }
}

(async function manageEmployees() {
  const employeeNames = ['Alice', 'Bob', 'Charlie'];
  const employees = employeeNames.map(
    (name) => new Employee(name, `Position ${Math.floor(Math.random() * 10)}`)
  );

  employees.forEach((employee, index) => {
    dataStore.set(`emp${index + 3}`, employee);
  });

  for await (let employee of employeeGenerator(dataStore)) {
    print(employee.getDetails());
  }
})();
