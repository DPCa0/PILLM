(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class ComplexCalculator {
        #internalState = 0;

        constructor(initValue = 0) {
            this.#internalState = initValue;
        }

        async compute(addend) {
            await delay(1000);  
            return this.#internalState + addend;
        }

        updateInternalState(newValue) {
            this.#internalState = newValue;
        }
    }

    const logger = (message, level = 'info') => {
        const levels = { info: '\x1b[32m%s\x1b[0m', error: '\x1b[31m%s\x1b[0m' };
        print(levels[level] || levels.info, message);
    };

    const executeComplexOperations = async () => {
        const calc = new ComplexCalculator(5);

        try {
            const results = await Promise.all(
                [10, 15, 20].map(async (number) => {
                    logger(`Starting computation for ${number}`);
                    const result = await calc.compute(number);
                    logger(`Computed result: ${result}`);
                    return result;
                })
            );

            const finalSum = results.reduce((acc, num) => acc + num, 0);
            logger(`Final sum of computations: ${finalSum}`);
        } catch (error) {
            logger(`Error encountered: ${error.message}`, 'error');
        }
    };

    executeComplexOperations();
})();
