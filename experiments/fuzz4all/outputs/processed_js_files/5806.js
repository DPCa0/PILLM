class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

class MiddlewareHandler {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  execute(context, callback) {
    const executeMiddleware = (index) => {
      if (index === this.middlewares.length) return callback(context);
      const middleware = this.middlewares[index];
      middleware(context, () => executeMiddleware(index + 1));
    };
    executeMiddleware(0);
  }
}

const emitter = new EventEmitter();
const middlewareHandler = new MiddlewareHandler();

middlewareHandler.use((ctx, next) => {
  print("Middleware 1 Start");
  ctx.data++;
  next();
  print("Middleware 1 End");
});

middlewareHandler.use((ctx, next) => {
  print("Middleware 2 Start");
  setTimeout(() => {
    ctx.data *= 2;
    next();
    print("Middleware 2 End");
  }, 1000);
});

emitter.on('process', context => {
  middlewareHandler.execute(context, (finalContext) => {
    print('Final Result:', finalContext.data);
  });
});

let context = { data: 1 };
emitter.emit('process', context);
