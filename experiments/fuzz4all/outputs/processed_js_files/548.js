class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static fromEvent(target, eventName) {
    return new Observable((observer) => {
      const handler = (event) => observer.next(event);
      target.addEventListener(eventName, handler);
      return {
        unsubscribe() {
          target.removeEventListener(eventName, handler);
        },
      };
    });
  }

  map(transformFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => observer.next(transformFn(value)),
      });
    });
  }

  filter(predicateFn) {
    return new Observable((observer) => {
      return this.subscribe({
        next: (value) => {
          if (predicateFn(value)) {
            observer.next(value);
          }
        },
      });
    });
  }

  debounceTime(delay) {
    return new Observable((observer) => {
      let timeoutId = null;
      return this.subscribe({
        next: (value) => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => observer.next(value), delay);
        },
      });
    });
  }
}

const click$ = Observable.fromEvent(document, 'click');

click$
  .map((event) => ({ x: event.clientX, y: event.clientY }))
  .filter((coords) => coords.x < window.innerWidth / 2)
  .debounceTime(300)
  .subscribe({
    next: (coords) => console.log('Left-side click at:', coords),
  });
