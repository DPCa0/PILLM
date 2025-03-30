class Observable {
  constructor(subscribe) {
    this.subscribe = subscribe;
  }

  static fromEvent(element, event) {
    return new Observable((observer) => {
      const handler = (e) => observer.next(e);
      element.addEventListener(event, handler);
      
      return {
        unsubscribe() {
          element.removeEventListener(event, handler);
        }
      };
    });
  }

  map(projection) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => observer.next(projection(value)),
      });
    });
  }

  filter(predicate) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => {
          if (predicate(value)) {
            observer.next(value);
          }
        }
      });
    });
  }
}

const input$ = Observable.fromEvent(document, 'click')
  .map(e => ({ x: e.clientX, y: e.clientY }))
  .filter(coord => coord.x > 100);

const subscription = input$.subscribe({
  next: coord => console.log(`Clicked at X: ${coord.x}, Y: ${coord.y}`)
});

 
setTimeout(() => subscription.unsubscribe(), 10000);
