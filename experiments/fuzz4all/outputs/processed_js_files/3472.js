class Employee {
  #name;  
  #salary;

  constructor(name, salary) {
    this.#name = name;
    this.#salary = salary;
  }

  get name() {
    return this.#name;
  }

  getAnnualSalary() {
    return this.#salary * 12;
  }

  static averageSalary(employees) {
    const totalSalary = employees.reduce((acc, emp) => acc + emp.#salary, 0);
    return totalSalary / employees.length;
  }
}

const generateEmployees = (names) => {
  return names.map((name, index) => new Employee(name, Math.random() * 5000 + 3000));
};

const employees = generateEmployees(['Alice', 'Bob', 'Charlie', 'Dana']);

const topPaidEmployee = employees.find(emp => emp.getAnnualSalary() > 50000);
const averageSalary = Employee.averageSalary(employees);

print(`Top Paid Employee: ${topPaidEmployee?.name || 'None'}, Annual Salary: $${topPaidEmployee?.getAnnualSalary()}`);
print(`Average Monthly Salary: $${averageSalary.toFixed(2)}`);
