class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static fromEvent(element, eventType) {
    return new Observable(observer => {
      const handler = (event) => observer.next(event);
      element.addEventListener(eventType, handler);
      return () => element.removeEventListener(eventType, handler);
    });
  }

  map(fn) {
    return new Observable(observer => 
      this.subscribe({
        next: x => observer.next(fn(x)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    );
  }
}

const button = document.createElement('button');
button.textContent = 'Click me';
document.body.appendChild(button);

const clicks$ = Observable.fromEvent(button, 'click')
  .map(event => `Button clicked at coordinates: ${event.clientX}, ${event.clientY}`);

const unsubscribe = clicks$.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('Complete')
});

 
 
