// Utility helper to get the type out of a Promise 
type ReturnPromiseType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;

export function throttle<F extends (...args: any[]) => any>(fetch: F, wait: number) {
    let lastRun = 0;
    let timeoutId: number = 0;

    async function throttled(...args: Parameters<F>): Promise<ReturnPromiseType<F> | undefined> {
        const currentWait = lastRun + wait - Date.now();
        const shouldRun = currentWait <= 0;

        if (shouldRun) {
            lastRun = Date.now();

            return await fetch(...args);
        }

        if (timeoutId) {
            window.clearTimeout(timeoutId as any as number);
        }

        return await new Promise((resolve) => {
            timeoutId = window.setTimeout(() => {
                resolve(throttled(...args));
            }, currentWait);
        });
    }

    return throttled;
}
