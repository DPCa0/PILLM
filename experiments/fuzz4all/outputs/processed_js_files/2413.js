 
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

  getFullName() {
    return `${this.#capitalize(this.#firstName)} ${this.#capitalize(this.#lastName)}`;
  }

   
  #capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

 
class Student extends Person {
  #courses = new Set();

  constructor(firstName, lastName) {
    super(firstName, lastName);
  }

  addCourse(course) {
    this.#courses.add(course);
  }

  removeCourse(course) {
    this.#courses.delete(course);
  }

  get courses() {
    return [...this.#courses].sort();
  }

  set courses(coursesArray) {
    if (Array.isArray(coursesArray)) {
      this.#courses = new Set(coursesArray);
    } else {
      console.error("Courses must be an array");
    }
  }

   
  static fromJSON(json) {
    const data = JSON.parse(json);
    const student = new Student(data.firstName, data.lastName);
    student.courses = data.courses;
    return student;
  }
}

 
async function fetchStudentData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve('{"firstName": "john", "lastName": "doe", "courses": ["Math", "Science"]}'), 1000)
  );
}

 
(async () => {
  const studentData = await fetchStudentData();
  const student = Student.fromJSON(studentData);

  student.addCourse("English");
  print(`Student: ${student.getFullName()}`);
  print(`Courses: ${student.courses.join(", ")}`);
})();
