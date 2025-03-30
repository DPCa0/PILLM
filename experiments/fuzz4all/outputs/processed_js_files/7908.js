class Employee {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  getDetails() {
    return `${this.name} works as a ${this.role}.`;
  }
}

const rolesMap = new Map([
  ['Alice', 'Engineer'],
  ['Bob', 'Designer'],
  ['Charlie', 'Manager'],
]);

const employees = [...rolesMap].map(([name, role]) => new Employee(name, role));

function* detailsGenerator(employeesList) {
  for (const employee of employeesList) {
    yield employee.getDetails();
  }
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property '${prop}' does not exist.`;
  },
};

const employeeProxy = new Proxy(employees, proxyHandler);

const detailsGen = detailsGenerator(employeeProxy);

print(detailsGen.next().value);  
print(detailsGen.next().value);  
print(employeeProxy[1].getDetails());  
print(employeeProxy[4]);  
