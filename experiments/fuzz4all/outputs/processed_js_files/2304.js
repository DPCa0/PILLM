 
const university = {
  name: 'Tech University',
  established: 1990,
  faculties: ['Engineering', 'Arts', 'Science'],
  courses: {
    Engineering: ['Computer Science', 'Electrical', 'Mechanical'],
    Arts: ['History', 'Literature', 'Philosophy'],
    Science: ['Biology', 'Chemistry', 'Physics']
  },
  getCourseList(faculty) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.courses[faculty]) {
          resolve(this.courses[faculty]);
        } else {
          reject(`No courses found for ${faculty}`);
        }
      }, 1000);
    });
  },
  async printAllCourses() {
    try {
      print(`Courses offered by ${this.name}:`);
      for (const faculty of this.faculties) {
        const courses = await this.getCourseList(faculty);
        print(`${faculty}: ${courses.join(', ')}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

 
const universityProxy = new Proxy(university, {
  get(target, property) {
    print(`Accessed property: ${property}`);
    if (property in target) {
      return Reflect.get(target, property);
    } else {
      console.warn(`Property ${property} does not exist`);
    }
  }
});

 
(async () => {
  print(`Welcome to ${universityProxy.name}`);
  await universityProxy.printAllCourses();
})();
