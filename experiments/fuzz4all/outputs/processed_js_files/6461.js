class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  
  subscribe(observer) {
    return this._subscribe(observer);
  }
  
  map(transform) {
    return new Observable(observer => {
      return this.subscribe({
        next: x => observer.next(transform(x)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      });
    });
  }

  static fromEvent(element, eventName) {
    return new Observable(observer => {
      const handler = event => observer.next(event);
      element.addEventListener(eventName, handler);

      return {
        unsubscribe() {
          element.removeEventListener(eventName, handler);
        }
      };
    });
  }
}

const button = document.querySelector('button');
const clicks = Observable.fromEvent(button, 'click');

const clickCounts = clicks.map(event => ({
  x: event.clientX,
  y: event.clientY
}));

const subscription = clickCounts.subscribe({
  next: pos => console.log(`Clicked at position: ${pos.x}, ${pos.y}`),
  error: err => console.error('Error:', err),
  complete: () => console.log('Completed')
});

 
 
