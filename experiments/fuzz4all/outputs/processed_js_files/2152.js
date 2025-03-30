class AsyncPipeline {
    constructor() {
        this.middlewares = [];
    }

    use(middleware) {
        this.middlewares.push(middleware);
        return this;
    }

    async execute(context) {
        for (const middleware of this.middlewares) {
            await middleware(context);
        }
        return context;
    }
}

async function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

const pipeline = new AsyncPipeline()
    .use(async (ctx) => {
        print(`Start: ${ctx.message}`);
        ctx.startTime = Date.now();
        await delay(500);
    })
    .use(async (ctx) => {
        ctx.message = ctx.message.toUpperCase();
        await delay(300);
    })
    .use(async (ctx) => {
        ctx.message = ctx.message.split('').reverse().join('');
        await delay(200);
    })
    .use(async (ctx) => {
        ctx.endTime = Date.now();
        print(`Result: ${ctx.message}`);
        print(`Duration: ${ctx.endTime - ctx.startTime}ms`);
    });

(async () => {
    const context = { message: 'Hello, world!' };
    await pipeline.execute(context);
})();
