class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static from(iterable) {
    return new Observable((observer) => {
      for (const item of iterable) {
        observer.next(item);
      }
      observer.complete();
    });
  }

  map(transform) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => observer.next(transform(value)),
        complete: () => observer.complete()
      });
    });
  }

  filter(predicate) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => predicate(value) ? observer.next(value) : undefined,
        complete: () => observer.complete()
      });
    });
  }

  reduce(accumulator, initialValue) {
    return new Observable((observer) => {
      let accumulatorValue = initialValue;
      return this.subscribe({
        next: (value) => accumulatorValue = accumulator(accumulatorValue, value),
        complete: () => {
          observer.next(accumulatorValue);
          observer.complete();
        }
      });
    });
  }
}

 
const numbers = [1, 2, 3, 4, 5];
Observable.from(numbers)
  .map(x => x * 2)
  .filter(x => x > 5)
  .reduce((acc, x) => acc + x, 0)
  .subscribe({
    next: result => console.log("The result is:", result),
    complete: () => console.log("Observable complete")
  });
