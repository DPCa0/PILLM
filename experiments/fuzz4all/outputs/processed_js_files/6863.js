class Employee {
    #id;  
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.#id = Symbol();  
    }
    
    get id() {
        return this.#id;
    }

    [Symbol.iterator]() {  
        let properties = Object.entries(this);
        let count = 0;
        return {
            next: () => ({
                done: count >= properties.length,
                value: properties[count++]
            })
        };
    }

    *salaryHistory() {  
        const increment = 0.05;
        let years = 0;
        let currentSalary = this.salary;
        while (years < 5) {
            yield { year: ++years, salary: currentSalary };
            currentSalary += currentSalary * increment;
        }
    }

    static async fetchEmployeeData(url) {  
        try {
            const response = await fetch(url);
            const data = await response.json();
            return new Employee(data.name, data.salary);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    }
}

(async () => {
    const emp = await Employee.fetchEmployeeData('https://api.example.com/employee/1');

    if (emp) {
        print(`Employee ID: ${emp.id.toString()}`);
        
        print('Employee Details:');
        for (const [key, value] of emp) {
            print(`${key}: ${value}`);
        }
        
        print('Salary History:');
        for (const record of emp.salaryHistory()) {
            print(`Year ${record.year}: ${record.salary.toFixed(2)}`);
        }
    }
})();
