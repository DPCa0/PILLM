class Employee {
  #name;
  #salary;

  constructor(name, salary) {
    this.#name = name;
    this.#salary = salary;
  }

  getSalaryDetails() {
    return `${this.#name}'s salary is $${this.#salary}.`;
  }
}

const employeeProxyHandler = {
  get(target, prop) {
    if (prop === 'salary') {
      return target.getSalaryDetails();
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (prop === 'salary') {
      if (value < 0) throw new Error('Salary cannot be negative');
      return Reflect.set(target, '#salary', value);
    }
    return Reflect.set(target, prop, value);
  },
};

const emp1 = new Employee('Alice', 75000);
const emp1Proxy = new Proxy(emp1, employeeProxyHandler);

print(emp1Proxy.salary);

try {
  emp1Proxy.salary = -5000;
} catch (e) {
  console.error(e.message);
}

async function* salaryGenerator(employees) {
  for (const employee of employees) {
    yield new Promise(resolve => setTimeout(() => resolve(employee.getSalaryDetails()), 1000));
  }
}

(async function () {
  const employees = [
    new Employee('Bob', 85000),
    new Employee('Charlie', 95000)
  ];

  const employeeGen = salaryGenerator(employees);

  for await (const salaryDetails of employeeGen) {
    print(salaryDetails);
  }
})();
