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

const asyncComputation = async (num) => {
  const result = await new Promise(resolve => setTimeout(() => resolve(num * 2), 1000));
  return result;
};

const applyMiddlewares = (middlewares, context) => {
  const compose = (mw, ctx) => mw.reduceRight((next, fn) => () => fn(ctx, next), () => {})(ctx);

  return (next) => {
    return compose(middlewares, context)(next);
  };
};

const loggerMiddleware = async (context, next) => {
  print(`Start: ${context.value}`);
  await next();
  print(`End: ${context.value}`);
};

(async () => {
  const emitter = new EventEmitter();

  emitter.on('compute', async (num) => {
    const context = { value: num };
    const enhancedComputation = applyMiddlewares([loggerMiddleware], context)(async () => {
      context.value = await asyncComputation(context.value);
    });

    await enhancedComputation();
    print(`Computed Result: ${context.value}`);
  });

  emitter.emit('compute', 5);
})();
